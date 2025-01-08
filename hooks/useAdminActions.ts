import { useState } from "react";
import { showNotification } from "@/constants/notification";

import AdminManager from "@/services/managers/adminManager";
import UserManager, { UserSearchResult } from "@/services/managers/userManager";

export const useAdminUserActions = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserSearchResult[]>([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await UserManager.FIND_USERS({});

      if (res.status !== 200 || "error" in res.data) {
        throw new Error(res.data.message);
      }

      const usersData: UserSearchResult[] = res.data;
      setUsers(usersData);
    } catch (error) {
      showNotification(
        "error",
        "Erreur lors de la récupération des utilisateurs",
        `Erreur: ${error.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const promoteUser = async (userId: number, userPseudo: string) => {
    try {
      setLoading(true);
      const res = await AdminManager.PROMOTE_USER(userId);

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      showNotification(
        "success",
        "Promotion réussie",
        `${userPseudo} a été promu avec succès.`,
      );
    } catch (error) {
      showNotification(
        "error",
        "Erreur survenue lors de la promotion",
        `Erreur: ${error.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const demoteUser = async (userId: number, userPseudo: string) => {
    try {
      setLoading(true);
      const res = await AdminManager.DEMOTE_USER(userId);

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      showNotification(
        "success",
        "Rétrogradation réussie",
        `${userPseudo} a été rétrogradé avec succès.`,
      );
      return res;
    } catch (error) {
      showNotification(
        "error",
        "Erreur survenue lors de rétrogradation",
        `Erreur: ${error.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const restrictUser = async (userId: number, userPseudo: string) => {
    try {
      setLoading(true);
      const res = await AdminManager.RESTRICT_USER(userId);

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      showNotification(
        "success",
        "Restriction réussie",
        `${userPseudo} a été restreint avec succès.`,
      );
      return res;
    } catch (error) {
      showNotification(
        "error",
        "Erreur de restriction",
        `Erreur: ${error.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const freeUser = async (userId: number, userPseudo: string) => {
    try {
      setLoading(true);
      const res = await AdminManager.FREE_USER(userId);

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      showNotification(
        "success",
        "Levée de restriction réussie",
        `La restriction de ${userPseudo} a été levée avec succès.`,
      );
      return res;
    } catch (error) {
      showNotification(
        "error",
        "Erreur de levée de restriction",
        `Erreur: ${error.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    fetchUsers,
    promoteUser,
    demoteUser,
    restrictUser,
    freeUser,
    loading,
  };
};
