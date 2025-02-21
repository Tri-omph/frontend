// Ce fichier doit uniquement être complété avec les endpoints concernant les utilisateurs,
// [ACCES AUX ENDPOINTS DU BACK] =>  https://github.com/Tri-omph/backend/blob/main/ENDPOINTS.md

export const METRICS_ENDPOINTS = {
  // ******************* GET

  // *** USER
  GET_USER_SCAN_INFO: "/metrics/scaninfo/me",
  GET_USER_BINS_INFO: "/metrics/bins/me",

  // *** ADMIN
  GET_ALL_USERS_SCAN_INFO: "/metrics/scaninfo",
  GET_USER_SCAN_INFO_BY_ID: (id: number) => `/metrics/scaninfo/${id}`,

  GET_ALL_USERS_BINS_INFO: "/metrics/bins",
  GET_USER_BINS_INFO_BY_ID: (id: number) => `/metrics/bins/${id}`,
};
