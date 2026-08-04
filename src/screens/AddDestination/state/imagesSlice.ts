import { UploadedImage } from "../types";

export const createImagesSlice = (
  set: (
    partial: Partial<{
      images: UploadedImage[] | null;
    }>,
  ) => void,
) => ({
  images: null,
  setImages: (images: UploadedImage[] | null) => set({ images }),
});
