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
  defaultValue?: string;
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
  defaultValue,
  placeholder,
  rules,
  secureTextEntry = false,
  keyboardType = "default",
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      {/* Conteneur interne pour le champ et l'erreur */}
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
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
              value={value || defaultValue}
            />
          )}
        />
        {/* Affichage de l'erreur sous le champ si elle existe */}
        {errors[name] && (
          <Text style={styles.error}>{errors[name].message}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 15,
    flexDirection: "row", // Reste en row pour l'alignement général
    alignItems: "flex-start", // Garde les éléments alignés en haut
  },
  label: {
    fontSize: 16,
    color: "#000",
    marginRight: 10, // Un peu d'espace entre l'étiquette et le champ
  },
  inputWrapper: {
    flexDirection: "column", // Aligner le champ et l'erreur en colonne
    width: 275,
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
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    marginTop: 5, // Un peu d'espace entre le champ et l'erreur
  },
});

export default FormInput;
