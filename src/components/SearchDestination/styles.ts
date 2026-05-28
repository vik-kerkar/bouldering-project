import { StyleSheet } from "react-native";
import { colors } from "@/src/theme";
import { typography } from "@/src/theme/typography";

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
    marginTop: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.primary5,
    width: "90%",
    height: 44,
    borderRadius: 10,
  },
  searchInput: {
    ...typography.bodyText,
    color: colors.text,
    borderWidth: 0,
    width: "75%",
    borderColor: "transparent",
  },
  searchInputError: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  autoCompleteContainer: {
    backgroundColor: colors.primary5,
    width: "100%",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 10,
    position: "absolute",
    top: 0,
  },
  autoCompleteItem: {
    paddingVertical: 4,
  },
  autoCompletePlace: {
    ...typography.alternateText,
  },
  autoCompleteCountry: {
    color: colors.textSecondary,
  },
  validationError: {
    ...typography.errorText,
    alignSelf: "flex-start",
    marginBlockStart: 8,
    paddingLeft: 36,
  },
  coordinatesIcon: {
    alignSelf: "center",
    marginLeft: "auto",
  },
});

export default styles;
