import Toast from "react-native-toast-message";

/**
 * Fonction pour afficher une notification à l'utilisateur.
 *
 * @param {("success" | "error")} notificationType - Type de notification (succès ou erreur)
 * @param {string} title - Titre de la notification
 * @param {string} message - Message de la notification
 */
export const showNotification = (
  toastType: "success" | "error",
  title: string,
  message: string,
) => {
  Toast.show({
    type: toastType,
    text1: title,
    text2: message,
  });
};
