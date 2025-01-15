import React from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface SearchBarProps extends TextInputProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  onClickOnFilterIcon: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder,
  onChangeText,
  onClickOnFilterIcon,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        clearButtonMode="always"
        style={styles.searchBar}
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />

      <TouchableOpacity
        onPress={onClickOnFilterIcon}
        style={styles.iconContainer}
      >
        <FontAwesome5 name="filter" size={20} color="#555" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    position: "relative",
  },
  searchBar: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 50,
  },
  iconContainer: {
    padding: 8,
  },
});

export default SearchBar;
