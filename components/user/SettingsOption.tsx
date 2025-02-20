import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

// Type pour les propriétés de SettingsOption
type SettingsOptionProps = {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  title: string;
  description: string;
};

const SettingsOption: React.FC<SettingsOptionProps> = ({
  value,
  onValueChange,
  title,
  description,
}) => (
  <View style={styles.option}>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#ccc", true: "#6AA84F" }}
      thumbColor={value ? "#FFFFFF" : "#f4f3f4"}
    />
    <Text style={styles.optionText}>
      <Text style={styles.optionBoldText}>{title}</Text>
      {"\n"}
      <Text style={styles.optionSubtext}>{description}</Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
    marginLeft: 10,
  },
  optionBoldText: {
    fontWeight: "bold",
    color: "black",
  },
  optionSubtext: {
    fontSize: 12,
    color: "#777777",
  },
});
export default SettingsOption;
