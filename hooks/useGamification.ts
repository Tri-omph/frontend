import { useState } from "react";
import { showNotification } from "@/constants/notification"; // Si tu veux afficher des notifications d'erreur
import gamificationManager from "@/services/managers/gamificationManager";
import { LeaderboardType } from "@/services/managers/gamificationManager";

export const useGamification = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([]);

  const fetchLeaderboard = async () => {
    setLoading(true);

    try {
      const response = await gamificationManager.GET_LEADER_BOARD();

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      setLeaderboard(response.data); // On met à jour l'état avec les données récupérées
    } catch (error) {
      showNotification(
        "error",
        "Impossible de récupérer le leaderboard.",
        error.message || "Erreur inconnue",
      );
    } finally {
      setLoading(false); // Indépendamment du succès ou de l'échec, on arrête le chargement
    }
  };

  return {
    leaderboard,
    loading,
    refreshLeaderboard: fetchLeaderboard,
  };
};
