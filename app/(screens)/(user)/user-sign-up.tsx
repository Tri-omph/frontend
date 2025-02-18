import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";

import FormInput from "@/components/user/FormInput";
import { useSession } from "@/hooks/useSession";
import { signUpFormAndRules } from "@/constants/formRules";
import { useUserActions } from "@/hooks/useUserActions";
import { useUserInformation } from "@/context/UserInformationContext";

export default function UserSignUpScreen() {
  const { control, handleSubmit, errors } = useUserActions();
  const { handleSignUp } = useSession();

  const { saveImage } = useUserInformation();

  const onSubmit = (data: {
    username: string;
    password: string;
    email: string;
    confirmPassword: string;
  }) => {
    // On rajoute au formulaire le boolean saveImage depuis le context UserInformation
    const signUpData = { ...data, saveImage };
    handleSignUp(signUpData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/monstre_v1.png")}
          style={styles.monster}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Inscription</Text>
          <Text style={styles.subtitle}>
            Créer votre compte pour utiliser l'application
          </Text>

          {signUpFormAndRules.map((rule) => (
            <FormInput
              key={rule.name}
              name={rule.name}
              control={control}
              errors={errors}
              label={rule.label}
              placeholder={rule.placeholder}
              keyboardType={rule.keyboardType}
              secureTextEntry={rule.secureTextEntry}
              rules={rule.rules}
            />
          ))}

          {/* Bouton de soumission */}
          <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Je m'inscris</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F8F4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E8F4E1",
    width: "100%",
    height: "15%",
  },
  monster: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "85%",
    justifyContent: "center",
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#28A745",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
    marginVertical: 5,
  },
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
  button: {
    backgroundColor: "#28A745",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
