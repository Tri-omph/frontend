import { StyleSheet, Text, Pressable } from "react-native";
import { signUpFormAndRules } from "@/constants/formRules";
import Toast from "react-native-toast-message";
import { useUserActions } from "@/hooks/useUserActions";
import { useUserInformation } from "@/context/UserInformationContext";
import React from "react";
import FormDisplayer from "@/components/general/FormDisplayer";
import Header from "@/components/general/Header";
import { ScrollView } from "react-native-gesture-handler";
import SettingsOption from "@/components/user/SettingsOption";
import { dataPolicy } from "@/constants/DataPolicy";

export default function UserUpdateScreen() {
  const {
    control,
    handleSubmit,
    errors,
    loading,
    handleUpdateUserInformation,
  } = useUserActions();
  const { username, email, saveImage, setUserData } = useUserInformation();

  const toggleSavePhotos = () => {
    setUserData({ saveImage: !saveImage });
  };

  const onSubmit = (data: {
    username: string;
    password: string;
    email: string;
    confirmPassword: string;
  }) => {
    // Ajouter les données du contexte (comme saveImage)
    const updatedData = { ...data, saveImage };
    handleUpdateUserInformation(updatedData);
  };

  return (
    <ScrollView style={styles.container}>
      {/* En-tête avec l'image */}
      <Header
        title={`Bonjour ${username}`}
        subtitle={`Voici votre email actuel : ${email}`}
      />

      <Text style={styles.title}>Données utilisateur</Text>
      <Text style={styles.subtitle}>Modifier vos informations</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
        {/* Affichage du formulaire */}
        <FormDisplayer
          formRules={signUpFormAndRules}
          control={control}
          errors={errors}
        />

        {/* Option pour sauvegarder les photos */}
        <SettingsOption
          value={saveImage}
          onValueChange={toggleSavePhotos}
          title={dataPolicy[0].title}
          description={dataPolicy[0].description}
        />

        <Pressable
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Modification en cours..." : "Modifier"}
          </Text>
        </Pressable>

        {/* Toast pour notifications */}
        <Toast />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#67AA52",
    marginTop: 20,
    paddingLeft: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    paddingLeft: 20,
  },
  button: {
    backgroundColor: "#67AA52",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
