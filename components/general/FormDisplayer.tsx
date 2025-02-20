import React from "react";
import { View, StyleSheet } from "react-native";
import FormInput from "@/components/user/FormInput";
import { FormRuleType } from "@/constants/formRules";

interface FormDisplayerProps {
  formRules: FormRuleType[];
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  control: any;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  errors: any;
}

const FormDisplayer: React.FC<FormDisplayerProps> = ({
  formRules,
  control,
  errors,
}) => {
  return (
    <>
      {formRules.map((rule) => (
        <View key={rule.name} style={styles.inputContainer}>
          {rule.icon}

          <FormInput
            name={rule.name}
            control={control}
            errors={errors}
            placeholder={rule.placeholder}
            keyboardType={rule.keyboardType}
            secureTextEntry={rule.secureTextEntry}
            rules={rule.rules}
          />
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    width: "100%",
  },
  icon: {
    marginRight: 10, // Espacement entre l'icône et l'input
    padding: 5, // Optionnel pour ajouter un peu de marge à l'icône
  },
});

export default FormDisplayer;
