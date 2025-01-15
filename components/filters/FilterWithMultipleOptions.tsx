import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";

const FilterWithMultipleOptions: React.FC<{
  filterTitle: string;
  filterLabel: string;
  selected: string[];
  setSelected: (value: string[]) => void;
  data: {
    key: string;
    value: string;
  }[];
}> = ({ filterTitle, filterLabel, selected, setSelected, data }) => {
  return (
    <View style={styles.filterSection}>
      <Text style={styles.title}>{filterTitle}</Text>
      <MultipleSelectList
        setSelected={(val: string[]) => setSelected(val)}
        data={data}
        save="value"
        label={filterLabel}
        search={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  filterSection: {
    marginBottom: 10,
  },
});

export default FilterWithMultipleOptions;
