// Ce fichier doit uniquement être complété avec les appels d'API concernant le scan.
// Pour chaque appel, il faudra préciser :
// ----- I) Le type du body, si nécessaire.
// ----- II) Le type de la réponse, si cela se déroule bien ! (Le cas d'erreur est déjà géré par ApiClient.ts)
// [ACCÈS AUX ENDPOINTS DU BACK (dont type de retour)] => https://github.com/Tri-omph/backend/blob/main/ENDPOINTS.md

import ApiClient from "@/services/ApiClient";
import { SCAN_ENDPOINTS } from "@/services/endpoints/scanEndpoints";

class ScanManager {
  // ******************* POST

  static GET_PRODUCT_PACKAGE_MATERIAL = (barcode: string) => {
    return ApiClient.get<{
      productFound: boolean;
      productPackagingMaterial: string;
      warning?: boolean;
      nbRequestsForBarcode?: number;
    }>(SCAN_ENDPOINTS.GET_PRODUCT_PACKAGE_MATERIAL(barcode));
  };
}

export default ScanManager;
