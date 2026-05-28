import { colors } from "./colors";

export const typography = {
  heading1: {
    fontFamily: "PramukhRounded-Bold",
    fontSize: 40,
    textTransform: "uppercase" as const,
    textAlign: "center" as const,
    letterSpacing: 2,
  },
  heading2: {
    fontFamily: "PramukhRounded-Semibold",
    fontSize: 32,
    letterSpacing: 1,
  },
  bodyText: {
    fontFamily: "Poppins-Light",
    fontSize: 15,
    color: colors.text,
  },
  linkText: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    color: colors.text,
  },
  alternateText: {
    fontFamily: "Manrope-Regular",
    fontSize: 12,
  },
  errorText: {
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    color: colors.error,
  },
};
