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
  heading3: {
    fontFamily: "PramukhRounded-Semibold",
    fontSize: 27,
    letterSpacing: 1.5,
  },
  bodyText: {
    fontFamily: "Poppins-Light",
    fontSize: 15,
    color: colors.text,
  },
  markerText: {
    fontFamily: "Poppins-Light",
    fontSize: 12,
    color: colors.neutral5,
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
