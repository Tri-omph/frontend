// Ce fichier doit uniquement etre complétées avec les appels d'api concernant la gamification,,
// Pour chaque appelle, il faudra préciser
// ----- I) Le type du body, si nécessaire
// ----- II) Le type de la réponse, si cela se déroule bien ! (Le cas d'erreur est déjà géré par ApiClient.ts
// [ACCES AUX ENDPOINTS DU BACK (dont type de retour)] =>  https://github.com/Tri-omph/backend/blob/main/ENDPOINTS.md

import ApiClient from "@/services/ApiClient";
import { GAMIFICATION_ENDPOINTS } from "@/services/endpoints/gamificationEndpoints";

// ----- I) TYPES

export interface User {
  id: number;
  username: string;
  points: number;
  restricted: boolean;
  admin: boolean;
}
class gamificationManager {
  // ******************* POST
  // ******************* GET

  static GET_LEADER_BOARD = () => {
    return ApiClient.get<User>(GAMIFICATION_ENDPOINTS.GET_LEADER_BOARD());
  };

  static GET_USER_LEADER_BOARD_POSITION = () => {
    return ApiClient.get<{
      rank: number;
    }>(GAMIFICATION_ENDPOINTS.GET_USER_LEADER_BOARD_POSITION());
  };

  // ******************* PATCH
}

export default gamificationManager;
