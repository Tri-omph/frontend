import * as FileSystem from "expo-file-system";
import { useCallback } from "react";

const useFileSystem = () => {
  // Fonction pour vérifier si un fichier existe déjà dans le stockage local
  const fileExists = useCallback(async (uri: string) => {
    const fileName = uri.split("/").pop();
    if (!fileName) throw new Error("Invalid file name");

    const localUri = `${FileSystem.documentDirectory}${fileName}`;
    try {
      const fileInfo = await FileSystem.getInfoAsync(localUri);
      return fileInfo.exists; // Retourne true si le fichier existe, sinon false
    } catch (error) {
      console.error("Error checking file existence:", error);
      return false;
    }
  }, []);

  // Fonction pour sauvegarder une image localement
  const saveImageLocally = useCallback(
    async (uri: string) => {
      try {
        const fileName = uri.split("/").pop();
        if (!fileName) throw new Error("Invalid file name");

        const localUri = `${FileSystem.documentDirectory}${fileName}`;

        // Vérifier si le fichier existe déjà
        const exists = await fileExists(uri);
        if (exists) {
          console.log(`Image already exists at ${localUri}`);
          return localUri; // Retourner l'URI local si l'image existe déjà
        }

        // Copier l'image dans le stockage local si elle n'existe pas
        await FileSystem.copyAsync({
          from: uri,
          to: localUri,
        });

        console.log(`Image saved locally at ${localUri}`);
        return localUri;
      } catch (error) {
        console.error("Error saving image:", error);
        throw error;
      }
    },
    [fileExists],
  );

  return {
    saveImageLocally,
  };
};

export default useFileSystem;
