import { showNotification } from "@/constants/notification";
import SortingManager from "@/services/managers/sortingManager";

export const useSorting = () => {
  const sortAndReward = async () => {
    try {
      const res = await SortingManager.SORT_AND_REWARD();

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      showNotification(
        "success",
        res.data.message,
        `Vous avez ${res.data.points} points`,
      );
    } catch (error) {
      showNotification(
        "error",
        "Erreur lors de la tentative de tri",
        error.message,
      );
    }
  };

  return {
    sortAndReward,
  };
};
