import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const FilterWithSingleOption: React.FC<{
  filterTitle: string;
  selected: string | null;
  setSelected: (value: string) => void;
  data: {
    key: string;
    value: string;
  }[];
}> = ({ filterTitle, selected, setSelected, data }) => {
  return (
    <View style={styles.filterGroup}>
      <Text style={styles.title}>{filterTitle}</Text>
      <SelectList
        setSelected={(val: string) => setSelected(val)}
        data={data}
        save="value"
        search={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterGroup: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
});

export default FilterWithSingleOption;
