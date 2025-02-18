// Ce fichier doit uniquement etre complétées avec les appels d'api concernant les utilisateurs,
// Pour chaque appelle, il faudra préciser
// ----- I) Le type du body, si nécessaire
// ----- II) Le type de la réponse, si cela se déroule bien ! (Le cas d'erreur est déjà géré par ApiClient.ts
// [ACCES AUX ENDPOINTS DU BACK (dont type de retour)] =>  https://github.com/Tri-omph/backend/blob/main/ENDPOINTS.md

import ApiClient from "@/services/ApiClient";
import { SORTING_ENDPOINTS } from "@/services/endpoints/sortingEndpoints";

class SortingManager {
  // ******************* POST
  // ******************* GET
  // ******************* PATCH

  static SORT_AND_REWARD = () => {
    return ApiClient.patch<{
      message: string;
      points: number;
      level: number;
    }>(SORTING_ENDPOINTS.SORT_AND_REWARD());
  };
}

export default SortingManager;
