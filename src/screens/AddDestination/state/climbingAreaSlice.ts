import { Coordinate, ClimbingArea } from "../types";

export const createClimbingAreaSlice = (
  set: (
    partial: Partial<{
      newArea: Coordinate | null;
      climbingAreas: ClimbingArea[] | null;
    }>,
  ) => void,
) => ({
  newArea: null,
  setNewArea: (newArea: Coordinate | null) => set({ newArea }),
  climbingAreas: null,
  setClimbingAreas: (climbingAreas: ClimbingArea[] | null) =>
    set({ climbingAreas }),
});
