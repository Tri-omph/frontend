import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { signUpFormAndRules } from "@/constants/formRules";
import FormInput from "@/components/user/FormInput";
import Toast from "react-native-toast-message";
import { useUserActions } from "@/hooks/useUserActions";
import { useUserInformation } from "@/context/UserInformationContext";
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

  // Dictionnaire associant les valeurs du contexte aux champs du formulaire
  const defaultValues: { [key: string]: string } = {
    username,
    email,
  };

  const toggleSavePhotos = () => {
    setUserData({ saveImage: !saveImage });
  };

  const onSubmit = (data: {
    username: string;
    password: string;
    email: string;
    confirmPassword: string;
  }) => {
    // On rajoute au formulaire le boolean saveImage depuis le context UserInformation
    const updatedData = { ...data, saveImage };
    handleUpdateUserInformation(updatedData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/monstre_v1.png")}
          style={styles.monster}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Données utilisateur</Text>
        <Text style={styles.subtitle}>Modifier vos données </Text>

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
            defaultValue={defaultValues[rule.name] ?? ""}
          />
        ))}

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
            {" "}
            {loading ? "Modification en cours..." : "Modifier"}
          </Text>
        </Pressable>
      </View>

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
