import { StyleSheet } from "react-native";
import { colors } from "@/src/theme";
import { typography } from "@/src/theme/typography";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
    alignItems: "stretch",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: colors.primary5,
    borderRadius: 10,
  },
  searchIcon: {
    alignSelf: "center",
    marginLeft: 12,
  },
  searchInput: {
    flexGrow: 1,
    height: 44,
  },
  searchInputError: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  autoCompleteWrapper: {
    position: "relative",
    top: -13,
    zIndex: 100,
    width: "100%",
  },
  autoCompleteContainer: {
    backgroundColor: colors.primary5,
    width: "100%",
    paddingLeft: 40,
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
    marginRight: 6,
  },
});

export default styles;
