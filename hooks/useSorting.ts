import { showNotification } from "@/constants/notification";
import SortingManager from "@/services/managers/sortingManager";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";

export const useSorting = () => {
  const { setUserLocalStorage } = useAsyncStorage();

  const sortAndReward = async () => {
    try {
      const res = await SortingManager.SORT_AND_REWARD();

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      await setUserLocalStorage({ level: res.data.level });

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
