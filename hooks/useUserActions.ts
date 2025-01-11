import { useState } from "react";
import { showNotification } from "@/constants/notification";
import UserManager from "@/services/managers/userManager";
import { useForm } from "react-hook-form";

export const useUserActions = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateUserInformation = async (body: {
    username: string;
    password: string;
    email: string;
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
      setLoading(true);
      const res = await UserManager.UPDATE_INFO_USER(body);

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      showNotification("success", "Mise à jour réussie", res.data.message);
    } catch (error) {
      showNotification("error", "Erreur lors de la mise à jour", error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    // Form
    control,
    handleSubmit,
    errors,
    // Update user information
    loading,
    handleUpdateUserInformation,
  };
};
