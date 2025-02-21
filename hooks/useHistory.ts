import { useState } from "react";
import { showNotification } from "@/constants/notification";
import HistoryManager, {
  ScanHistory,
} from "@/services/managers/historyManager";
import { AddIntoHistoryRequest } from "@/services/managers/historyManager";
import { useUserInformation } from "@/context/UserInformationContext";

export const useHistory = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ScanHistory[]>();

  // Accès au contexte pour mettre à jour les données utilisateur
  const { setUserData } = useUserInformation();

  const fetchUserHistory = async () => {
    try {
      setLoading(true);
      const res = await HistoryManager.GET_USER_HISTORY();

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      setHistory(res.data);
    } catch (error) {
      showNotification(
        "error",
        "Impossible de récupérer l'historique.",
        error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoryById = async (id: number) => {
    try {
      setLoading(true);
      const res = await HistoryManager.GET_HISTORY_BY_ID(id);

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      setHistory(res.data);
    } catch (error) {
      showNotification(
        "error",
        "Impossible de récupérer l'historique spécifié.",
        error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const addIntoHistory = async (body: AddIntoHistoryRequest) => {
    try {
      setLoading(true);
      const res = await HistoryManager.ADD_INTO_HISTORY(body);

      if (res.status !== 201) {
        throw new Error(res.data.message);
      }

      showNotification(
        "success",
        res.data.message,
        `Vous avez ${res.data.points} points`,
      );

      setUserData({
        points: res.data.points,
      });

      fetchUserHistory(); // Rafraîchir la liste après l'ajout
    } catch (error) {
      showNotification(
        "error",
        "Erreur lors de l'ajout à l'historique",
        error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    // State
    loading,
    history,
    // Actions
    fetchUserHistory,
    fetchHistoryById,
    addIntoHistory,
  };
};
