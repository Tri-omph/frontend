// Ce fichier doit uniquement être complété avec les endpoints concernant le scan.
// [ACCÈS AUX ENDPOINTS DU BACK] => https://github.com/Tri-omph/backend/blob/main/ENDPOINTS.md

export const SCAN_ENDPOINTS = {
  // ******************* POST
  // ******************* GET
  GET_PRODUCT_PACKAGE_MATERIAL: (barcode: string) =>
    `/scan/barcode?barcode=${barcode}`,

  // ******************* PATCH
};
