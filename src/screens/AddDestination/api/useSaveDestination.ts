import { useMutation, useQueryClient } from "@tanstack/react-query";
import { File } from "expo-file-system";
import { decode } from "base64-arraybuffer";

import supabase from "@/app/supabase";
import { NewDestination, ClimbingArea, UploadedImage } from "../types";

const BUCKET_NAME = "bouldering-images";

const uploadImage = async (
  uri: string,
  bucket: string,
  path: string,
  mimeType: string = "image/jpeg",
) => {
  const file = new File(uri);
  const base64 = await file.base64();
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, decode(base64), {
      contentType: mimeType,
      upsert: true,
    });
  if (error) {
    throw error;
  }

  const { path: imagePath } = data;

  const {
    data: { publicUrl },
  } = await supabase.storage.from(bucket).getPublicUrl(imagePath);

  return publicUrl;
};

export const getImageUrls: (
  images: UploadedImage[] | null,
  destinationName: string,
) => Promise<string[]> = async (images, destinationName) => {
  return await Promise.all(
    images?.map(async (image, index) => {
      const extension = image.fileName.split(".").pop();
      const path = `destinations/${destinationName}/${destinationName}-${index}.${extension}`;
      const publicUrl = await uploadImage(
        image.uri,
        BUCKET_NAME,
        path,
        image.mimeType || "",
      );
      return Promise.resolve(publicUrl);
    }) || [],
  );
};

const constructPayload = (
  newDestination: NewDestination,
  imageUrls: string[],
  defaultImageIndex: number,
) => ({
  ...(newDestination as NewDestination),
  imageUrls: imageUrls.filter((url) => url !== null) as string[],
  defaultImgUrlIndex: defaultImageIndex,
});

const saveDestination = async (newDestination: NewDestination) => {
  const { data, error } = await supabase
    .from("Destination")
    .insert(newDestination)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

const saveClimbingAreas = async (climbingAreas: ClimbingArea[]) => {
  const { data, error } = await supabase
    .from("ClimbingArea")
    .insert(climbingAreas)
    .select();

  if (error) {
    throw error;
  }

  return data;
};

type SaveDestinationParams = {
  images: UploadedImage[] | null;
  newDestination: NewDestination;
  climbingAreas?: ClimbingArea[] | null;
};

export const useSaveDestination = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      images,
      newDestination,
      climbingAreas,
    }: SaveDestinationParams) => {
      // upload the images
      const imageUrls = await getImageUrls(images, newDestination.name);
      const defaultImageIndex =
        images?.findIndex((image) => image.default) || 0;
      const destinationPayload: NewDestination = constructPayload(
        newDestination,
        imageUrls,
        defaultImageIndex,
      );

      // save the destination
      const savedDestination = await saveDestination(destinationPayload);
      const { id: destinationId } = savedDestination;

      // save the climbing areas
      if (climbingAreas && climbingAreas.length > 0) {
        const climbingAreasPayload = climbingAreas?.map((area) => ({
          ...area,
          destinationId: Number(destinationId),
        }));
        await saveClimbingAreas(climbingAreasPayload || []);
      }

      // Invalidate the destinations query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["destinations"] });

      return savedDestination;
    },
  });
};

export default useSaveDestination;
