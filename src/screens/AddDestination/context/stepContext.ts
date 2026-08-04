import { createContext } from "react";

export const StepContext = createContext(
  {} as { step: number; setStep: (step: number) => void },
);
