import { router } from "expo-router";

import { useAuthContext } from "@/hooks/useAuthContext";
import { showNotification } from "@/constants/notification";
import UserManager from "@/services/managers/userManager";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { useUserInformation } from "@/context/UserInformationContext";

const goToHomePage = () => {
  router.replace("/(tabs)");
};

const goToTutoriel = () => {
  router.replace("/user-tutoriel");
};

export const useSession = () => {
  // Ce hook gère les connexion et déconnexion et surtout, il cache la complexité liée à la gestion du token !
  // Se pose tout de meme la question de où l'on catch l'erreur, ici ou dans le composants ...
  const { removeUserLocalStorage } = useAsyncStorage();
  const { signIn, signOut } = useAuthContext();

  // Accès au contexte pour mettre à jour les données utilisateur
  const { setUserData, resetUserData } = useUserInformation();

  // ************* Appels des méthodes de connexion/déconnexion et gestion des erreurs !

  const handleSignUp = async (body: {
    username: string;
    password: string;
    email: string;
    saveImage: boolean;
    confirmPassword: string;
  }) => {
    if (body.password !== body.confirmPassword) {
      showNotification(
        "error",
        "Formulaire invalide",
        "Les mots de passe ne correspondent pas.",
      );
      return;
    }

    try {
      const res = await UserManager.CREATE_USER(body);

      if ("token" in res.data) {
        signIn(res.data.token);

        // Mettre à jour le contexte avec les données de l'utilisateur après un signUp
        setUserData({
          username: body.username,
          email: body.email,
          saveImage: body.saveImage,
          points: 0,
        });

        goToTutoriel();
      } else {
        // alors c'est un ErrorResponse et on récupère le message d'erreur !
        throw new Error(res.data.message);
      }
    } catch (error) {
      showNotification("error", "Erreur lors de l'inscription", error.message);
    }
  };

  const handleSignIn = async (body: { login: string; password: string }) => {
    try {
      const res = await UserManager.AUTH_USER(body);

      if ("token" in res.data) {
        signIn(res.data.token);

        // Là il faut récupérer les informations de l'utiliseur pour pouvoir remplir le contexte useUserInformation
        const fetchUserInformation = await UserManager.GET_INFO_USER();

        setUserData({
          username: fetchUserInformation.data.username,
          email: fetchUserInformation.data.login,
          saveImage: fetchUserInformation.data.saveImage,
          points: fetchUserInformation.data.points,
        });

        goToHomePage();
      } else {
        // alors c'est un ErrorResponse et on récupère le message d'erreur !
        throw new Error(res.data.message);
      }
    } catch (error) {
      showNotification("error", "Erreur lors de la connexion", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await removeUserLocalStorage();
      signOut();
      resetUserData();
      router.back(); // Pas besoin d'aller sur SIGN_IN, dès que l'utilisateur n'a plus son token, l'application le renvoie vers la page de connexion !
    } catch (error) {
      showNotification("error", "Erreur lors de la déconnexion", error.message);
    }
  };

  return {
    handleSignUp,
    handleSignIn,
    handleSignOut,
  };
};
