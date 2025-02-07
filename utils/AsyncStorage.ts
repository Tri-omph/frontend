import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageKeys } from "@/types/storageKeys";

// **************************************** CRUD

// ****************** CREATE / UPDATE
// Classic CREATE / UPDATE
export const setItem = async (
  key: StorageKeys,
  value: unknown,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item:", error);
  }
};

// MERGE, on ajoute un champ à l'existant. Exemple: await setItem("user", { name: "Alice", age: 25, level: 3 }); await mergeItem("user", { level: 4 });
export const mergeItem = async (
  key: StorageKeys,
  value: unknown,
): Promise<void> => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error merging item:", error);
  }
};

// ****************** READ
// Classic READ
export const getItem = async <T>(key: StorageKeys): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting item:", error);
    return null;
  }
};

// READ ALL KEYS
export const getAllKeys = async (): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return [...keys];
  } catch (error) {
    console.error("Error getting all keys:", error);
    return [];
  }
};

// READ ALL VALUES
export const getAllItems = async (): Promise<Record<string, unknown>> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    return items.reduce(
      (accumulator, [key, value]) => {
        accumulator[key] = JSON.parse(value);
        return accumulator;
      },
      {} as Record<string, unknown>,
    );
  } catch (error) {
    console.error("Error getting all items:", error);
    return {};
  }
};

// ****************** DELETE
// Classic DELETE
export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

// DELETE ALL
export const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};
