// Ce fichier doit uniquement etre complété avec les appels d'api concernant les utilisateurs,
// Pour chaque appel, il faudra préciser
// ----- I) Le type du body, si nécessaire
// ----- II) Le type de la réponse, si cela se déroule bien ! (Le cas d'erreur est déjà géré par ApiClient.ts
// [ACCES AUX ENDPOINTS DU BACK (dont type de retour)] =>  https://github.com/Tri-omph/backend/blob/main/ENDPOINTS.md

import ApiClient from "@/services/ApiClient";
import { ADMIN_ENDPOINTS } from "@/services/endpoints/adminEndpoints";

export type ScanAbuseWarningType = {
  id: number;
  barcode: string;
  scanCount: number;
  createdAt: string;
};

class AdminManager {
  // ******************* POST

  // ******************* GET
  static GET_USER_WARNINGS = (id: number) => {
    return ApiClient.get<ScanAbuseWarningType>(
      ADMIN_ENDPOINTS.GET_USER_WARNINGS(id),
    );
  };

  // ******************* PATCH
  static PROMOTE_USER = (id: number) => {
    return ApiClient.patch(ADMIN_ENDPOINTS.PROMOTE_USER(id));
  };

  static DEMOTE_USER = (id: number) => {
    return ApiClient.patch(ADMIN_ENDPOINTS.DEMOTE_USER(id));
  };

  static RESTRICT_USER = (id: number) => {
    return ApiClient.patch(ADMIN_ENDPOINTS.RESTRICT_USER(id));
  };

  static FREE_USER = (id: number) => {
    return ApiClient.patch(ADMIN_ENDPOINTS.FREE_USER(id));
  };
}

export default AdminManager;
