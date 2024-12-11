import ApiClient from "@/services/ApiClient";
import { ENDPOINTS } from "@/services/endpoints/userEndpoints";

class UserManager {
  // ******************* POST
  static CREATE_USER = (body: {
    username: string;
    password: string;
    email: string;
  }) => {
    return ApiClient.post(ENDPOINTS.CREATE_USER(), "", body);
  };

  static AUTH_USER = (body: { username: string; password: string }) => {
    return ApiClient.post(ENDPOINTS.AUTH_USER(), "", body);
  };

  // ******************* GET
  static GET_INFO_USER = (token: string) => {
    return ApiClient.get(ENDPOINTS.GET_INFO_USER(), token);
  };

  // ******************* PATCH
  static UPDATE_INFO_USER = (token: string) => {
    return ApiClient.get(ENDPOINTS.UPDATE_INFO_USER(), token);
  };
}

export default UserManager;
