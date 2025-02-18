// Ce fichier doit uniquement etre complétées avec les appels d'api concernant les utilisateurs,
// Pour chaque appelle, il faudra préciser
// ----- I) Le type du body, si nécessaire
// ----- II) Le type de la réponse, si cela se déroule bien ! (Le cas d'erreur est déjà géré par ApiClient.ts
// [ACCES AUX ENDPOINTS DU BACK (dont type de retour)] =>  https://github.com/Tri-omph/backend/blob/main/ENDPOINTS.md

import ApiClient from "@/services/ApiClient";
import { ENDPOINTS } from "@/services/endpoints/userEndpoints";

export type UserSearchRequest = {
  id?: number;
  username?: string;
  pointsMin?: number;
  pointsMax?: number;
  login?: string;
  restricted?: boolean;
  admin?: boolean;
};

export type UserSearchResult = {
  id: number;
  username: string;
  points: number;
  restricted: boolean;
  admin: boolean;
};

class UserManager {
  // ******************* POST
  /**
   * Créer un utilisateur
   * @param body { username: string; password: string; email: string }
   * @returns { message: string; token: string }
   */
  static CREATE_USER = (body: {
    username: string;
    password: string;
    email: string;
    saveImage: boolean;
  }) => {
    return ApiClient.post<{ message: string; token: string }>(
      ENDPOINTS.CREATE_USER(),
      body,
    );
  };

  /**
   * Authentifier un utilisateur
   * @param body { username: string; password: string }
   * @returns { token: string; expiresIn: number }
   */
  static AUTH_USER = (body: { login: string; password: string }) => {
    return ApiClient.post<{ token: string }>(ENDPOINTS.AUTH_USER(), body);
  };

  /**
   * Authentifier un utilisateur
   * @param body { username: string; password: string }
   * @returns { token: string; expiresIn: number }
   */
  static FIND_USERS = (body: UserSearchRequest) => {
    return ApiClient.post<UserSearchResult[]>(ENDPOINTS.FIND_USERS(), body);
  };

  // ******************* GET
  static GET_INFO_USER = () => {
    return ApiClient.get<{
      username: string;
      email: string;
      saveImage: boolean;
      points: number;
    }>(ENDPOINTS.GET_INFO_USER());
  };

  // ******************* PATCH
  static UPDATE_INFO_USER = (body: {
    username: string;
    password: string;
    email: string;
    saveImage: boolean;
  }) => {
    return ApiClient.patch(ENDPOINTS.UPDATE_INFO_USER(), body);
  };
}

export default UserManager;
