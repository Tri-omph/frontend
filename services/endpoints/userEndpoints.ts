// Ce fichier doit uniquement etre complétées avec les endpoints concernant les utilisateurs,
// [ACCES AUX ENDPOINTS DU BACK] =>  https://github.com/Tri-omph/backend/blob/main/ENDPOINTS.md

export const ENDPOINTS = {
  // ******************* POST
  CREATE_USER: () => `/users`,
  AUTH_USER: () => `/users/auth`,
  FIND_USERS: () => `/users/find/`,

  // ******************* GET
  GET_INFO_USER: () => `/users/me`,

  // ******************* PATCH
  UPDATE_INFO_USER: () => `/users/me`,
};
