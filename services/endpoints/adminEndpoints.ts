// Ce fichier doit uniquement etre complété avec les endpoints concernant les utilisateurs,
// [ACCES AUX ENDPOINTS DU BACK] =>  https://github.com/Tri-omph/backend/blob/main/ENDPOINTS.md

export const ADMIN_ENDPOINTS = {
  // ******************* POST

  // ******************* GET

  // ******************* PATCH
  PROMOTE_USER: (id: number) => `/admin/promote/${id}`,
  DEMOTE_USER: (id: number) => `/admin/demote/${id}`,
  RESTRICT_USER: (id: number) => `/admin/restrict/${id}`,
  FREE_USER: (id: number) => `/admin/free/${id}`,
};
