import { useState } from "react";
import { showNotification } from "@/constants/notification";

import AdminManager from "@/services/managers/adminManager";
import UserManager, { UserSearchResult } from "@/services/managers/userManager";
import filter from "lodash.filter";
import { UserFilter, UserStatusEnum } from "@/types/userEnums";

export const useAdminUserActions = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserSearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterUsers, setFilterUsers] = useState<UserSearchResult[]>([]);

  // ******************* Appels à l'API

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await UserManager.FIND_USERS({});

      if (res.status !== 200 || "error" in res.data) {
        throw new Error(res.data.message);
      }

      const usersData: UserSearchResult[] = res.data;
      setUsers(usersData);
      setFilterUsers(usersData);
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

  // ******************* Gestion des filtres
  // Barre de recherche
  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(users, (user: UserSearchResult) => {
      return contains(user, formattedQuery);
    });
    setFilterUsers(filteredData);
  };

  const contains = (user: UserSearchResult, query: string) => {
    return user.username.includes(query);
  };

  // Filtre avancé (voir components/admin/adminFilterOnUsers)

  const applyFilter = ({
    status,
    minPoints,
    maxPoints,
    order,
  }: {
    status?: string[];
    minPoints?: number | null;
    maxPoints?: number | null;
    order?: string | null;
  }) => {
    let filtered = [...users];

    // Filtrer par statut
    if (status && status.length > 0 && !status.includes(UserStatusEnum.TOUS)) {
      //filtered = filtered.filter((user) => status.includes(user.status)); => TODO
    }

    console.log(filtered);

    // Filtrer par points
    if (minPoints !== null && minPoints !== undefined) {
      filtered = filtered.filter((user) => user.points >= minPoints);
    }
    if (maxPoints !== null && maxPoints !== undefined) {
      filtered = filtered.filter((user) => user.points <= maxPoints);
    }

    // Appliquer l'ordre
    if (order) {
      filtered.sort((a, b) => {
        switch (order) {
          case UserFilter.PSEUDO:
            return a.username.localeCompare(b.username);
          case UserFilter.POINTS:
            return b.points - a.points;
          case UserFilter.STATUS:
            //return a.status.localeCompare(b.status); => TODO
            return 0;
          default:
            return 0;
        }
      });
    }
    console.log(filtered);
    setFilterUsers(filtered);
  };

  return {
    users,
    filterUsers,
    setUsers,
    setFilterUsers,
    fetchUsers,
    promoteUser,
    demoteUser,
    restrictUser,
    freeUser,
    loading,
    searchQuery,
    setSearchQuery,
    handleSearchQuery,
    applyFilter,
  };
};
