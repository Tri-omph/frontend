// Ce fichier doit uniquement être complété avec les appels d'API concernant l'historique de l'utilisateur.
// Pour chaque appel, il faudra préciser :
// ----- I) Le type du body, si nécessaire.
// ----- II) Le type de la réponse, si cela se déroule bien ! (Le cas d'erreur est déjà géré par ApiClient.ts)
// [ACCÈS AUX ENDPOINTS DU BACK (dont type de retour)] => https://github.com/Tri-omph/backend/blob/main/ENDPOINTS.md

import ApiClient from "@/services/ApiClient";
import { HISTORY_ENDPOINTS } from "@/services/endpoints/historyEndpoints";
import { detectionMethod } from "@/types/detectionMethods";

// I) ************************ TYPE

// type pour faire un POST
export interface AddIntoHistoryRequest {
  method: detectionMethod;
  isValid: boolean;
  poubelle: string;
  type: string;
}

// type retour du GET
export interface ScanHistory {
  id: number;
  method: detectionMethod;
  isValid: boolean;
  poubelle: string;
  type: string;
  date: string;
}

// II) ************************ REQUETES

class HistoryManager {
  // ******************* POST
  static ADD_INTO_HISTORY = (data: AddIntoHistoryRequest) => {
    return ApiClient.post<{ message: string; points: number }>(
      HISTORY_ENDPOINTS.ADD_INTO_HISTORY(),
      data,
    );
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

export default HistoryManager;
