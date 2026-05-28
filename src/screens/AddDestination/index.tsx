import { Text, View } from "react-native";
import { styles } from "./styles";
import RadioButtonGroup from "../../components/RadioGroup";
import { useState, useReducer } from "react";
import strings from "../../constants/strings.json";
import { SearchMode } from "@/src/components/SearchDestination/types";
import { Place } from "../../components/SearchDestination/types";

import SearchDestination from "@/src/components/SearchDestination";
import Stepper from "@/src/components/Stepper";

const AddDestination = () => {
  const [selectedMode, setSelectedMode] = useState<SearchMode>(
    SearchMode.Destinations,
  );

  const reducer = (state: Place | null, action: Place | null) => {
    return action;
  };

  const [foundPlace, dispatch] = useReducer(reducer, null);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={styles.headline}>{strings.addDestination.headline}</Text>
      <RadioButtonGroup
        selectedOption={selectedMode}
        onSelectOption={(option) => setSelectedMode(option as SearchMode)}
        options={[SearchMode.Destinations, SearchMode.Coordinates]}
      />
      <SearchDestination
        mode={selectedMode as SearchMode}
        dispatchPlace={dispatch}
        key={selectedMode}
      />
      {foundPlace && <Stepper />}
    </View>
  );
};

export default AddDestination;
