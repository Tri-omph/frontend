// Ce fichier doit uniquement être complété avec les appels d'API concernant l'historique de l'utilisateur.
// Pour chaque appel, il faudra préciser :
// ----- I) Le type du body, si nécessaire.
// ----- II) Le type de la réponse, si cela se déroule bien ! (Le cas d'erreur est déjà géré par ApiClient.ts)
// [ACCÈS AUX ENDPOINTS DU BACK (dont type de retour)] => https://github.com/Tri-omph/backend/blob/main/ENDPOINTS.md

import ApiClient from "@/services/ApiClient";
import { HISTORY_ENDPOINTS } from "@/services/endpoints/historyEndpoints";
import { detectionMethod } from "@/types/detectionMethods";
import { CameraCapturedPicture } from "expo-camera";

// I) ************************ TYPE

// type pour faire un POST (/!\ Regarder le commentaire NB)
export interface AddIntoHistoryRequest {
  method: detectionMethod;
  isValid: boolean;
  poubelle: string;
  type: string;
  image?: CameraCapturedPicture | null;
  /* NB:
  Il faut bien comprendre qu'en réalité, le back attend ici un blob à
  la place de ImageSourcePropType,tout cela est géré par history managers (voir utils) ! 
  => Enfin, le back attend en réalité un formData !
  */
}

// type retour du GET
export interface ScanHistory {
  id: number;
  method: detectionMethod;
  isValid: boolean;
  poubelle: string;
  type: string;
  date: string;
  image?: string;
}

// II) ************************ REQUETES

class HistoryManager {
  // ******************* POST
  static ADD_INTO_HISTORY = async (data: AddIntoHistoryRequest) => {
    let formData: FormData;
    try {
      formData = await prepareFormData(data);
      return ApiClient.post(HISTORY_ENDPOINTS.ADD_INTO_HISTORY(), formData);
    } catch (error) {
      console.error(
        "Error durant la mise en place du formData des données:",
        error,
      );
    }
  };

  // ******************* GET
  static GET_USER_HISTORY = () => {
    return ApiClient.get<ScanHistory[]>(HISTORY_ENDPOINTS.GET_USER_HISTORY());
  };

  static GET_HISTORY_BY_ID = (id: number) => {
    return ApiClient.get<ScanHistory[]>(
      HISTORY_ENDPOINTS.GET_HISTORY_BY_ID(id),
    );
  };
}

// III) ************************ UTILS
/* Ici, on garantit que la ressource est correctement utilisée, les hooks se contentent d'utiliser la ressource !
 On respecte donc bien le principe de séparation des responsabilité */

/** Prépare le formData pour l'ajout dans l'historique */
const prepareFormData = async (
  body: AddIntoHistoryRequest,
): Promise<FormData> => {
  const formData = new FormData();

  // Ajouter les données principales dans le FormData
  formData.append("method", body.method);
  formData.append("isValid", String(body.isValid));
  formData.append("poubelle", body.poubelle);
  formData.append("type", body.type);

  // Si une image est fournie, la préparer et l'ajouter au FormData
  if (body.image) {
    const imageUri = body.image.uri;
    const fileType = imageUri.split(".").pop();
    /* eslint-disable @typescript-eslint/no-explicit-any */
    formData.append("file", {
      uri: imageUri,
      name: `image.${fileType}`,
      type: `image/${fileType}`,
    } as any);
    /* eslint-disable @typescript-eslint/no-explicit-any */
  }

  return formData;
};

export default HistoryManager;
