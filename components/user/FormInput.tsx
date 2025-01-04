import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

interface FormInputProps {
  name: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  control: any;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  errors: any;
  label?: string;
  placeholder: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  rules?: any;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  control,
  errors,
  label,
  placeholder,
  rules,
  secureTextEntry = false,
  keyboardType = "default",
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors[name] && styles.inputError]}
            placeholder={placeholder}
            placeholderTextColor="#6D6D6D"
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors[name] && <Text style={styles.error}>{errors[name].message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    backgroundColor: "#FFF",
    padding: 15,
    marginVertical: 5,
    color: "#6D6D6D",
  },
  inputError: { borderColor: "red" },
  error: { color: "red", marginBottom: 10 },
});

export default FormInput;
