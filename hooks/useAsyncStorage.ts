import { useState, useEffect, useCallback } from "react";
import { getItem, setItem, mergeItem, removeItem } from "@/utils/AsyncStorage";
import { StorageKeys } from "@/types/storageKeys";

/**
 * 📌 Ce hook encapsule la gestion de l'utilisateur dans AsyncStorage et fournit un CRUD simple.
 *
 * 🔹 Pour y contribuer, cela se passe en deux parties :
 *    1️⃣ Définir le type de données utilisateur (exemple: `User`).
 *    2️⃣ Implémenter les opérations CRUD (`getUser`, `setUser`, `updateUser`, `removeUser`).
 *
 * ✅ Objectif : Simplifier l'accès à AsyncStorage tout en maintenant un state React cohérent.
 */

// ********************* 1️⃣ Définition du type (modèle des données stockées)
export interface UserLocalStorage {
  level: number;
}

// ********************* 2️⃣ CRUD pour gérer le type correspondant dans AsyncStorage

// ******** CRUD pour User

export const useAsyncStorage = () => {
  const [user, setUserState] = useState<UserLocalStorage | null>(null);

  // CREATE
  const setUserLocalStorage = useCallback(async (newUser: UserLocalStorage) => {
    try {
      await setItem(StorageKeys.USER, newUser);
      setUserState(newUser);
    } catch (error) {
      console.error("Error setting user:", error);
    }
  }, []);

  // READ
  const getUserLocalStorage = useCallback(async () => {
    try {
      const storedUser = await getItem<UserLocalStorage>(StorageKeys.USER);
      setUserState(storedUser);
      return storedUser;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  }, []);

  // UPDATE
  const updateUserLocalStorage = useCallback(
    async (updates: Partial<UserLocalStorage>) => {
      try {
        await mergeItem(StorageKeys.USER, updates);
        setUserState(
          (prevUser) => ({ ...prevUser, ...updates }) as UserLocalStorage,
        );
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    [],
  );

  // DELETE
  const removeUserLocalStorage = useCallback(async () => {
    try {
      await removeItem(StorageKeys.USER);
      setUserState(null);
    } catch (error) {
      console.error("Error removing user:", error);
    }
  }, []);

  // Charger l'utilisateur au montage du hook
  useEffect(() => {
    getUserLocalStorage();
  }, [getUserLocalStorage]);

  return {
    user,
    getUserLocalStorage,
    setUserLocalStorage,
    updateUserLocalStorage,
    removeUserLocalStorage,
  };
};
