// Ce fichier doit uniquement être complété avec les endpoints concernant le scan.
// [ACCÈS AUX ENDPOINTS DU BACK] => https://github.com/Tri-omph/backend/blob/main/ENDPOINTS.md

export const HISTORY_ENDPOINTS = {
  // ******************* POST
  ADD_INTO_HISTORY: () => `/users/history/me`,

  // ******************* GET
  GET_USER_HISTORY: () => `/users/history/me`,
  GET_HISTORY_BY_ID: (id: number) => `/users/history/${id}`,

  // ******************* PATCH
};
