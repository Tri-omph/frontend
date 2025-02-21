import ApiClient from "@/services/ApiClient";
import { METRICS_ENDPOINTS } from "@/services/endpoints/metricsEndpoints";
import { TypeBin } from "@/types/typeBin";

export type ScanInfoResponse = {
  ai: { total: number; correct: number };
  barcode: { total: number; correct: number };
  questions: { total: number; correct: number };
};

export type BinInfoResponse = Record<TypeBin, number>;

class MetricsManager {
  // ******************* GET

  /**
   * Récupérer les informations de scan de l'utilisateur
   * @returns { ScanInfoResponse }
   */
  static GET_USER_SCAN_INFO = () => {
    return ApiClient.get<ScanInfoResponse>(
      METRICS_ENDPOINTS.GET_USER_SCAN_INFO,
    );
  };

  /**
   * Récupérer les bins de l'utilisateur
   * @returns { BinInfoResponse }
   */
  static GET_USER_BINS_INFO = () => {
    return ApiClient.get<BinInfoResponse>(METRICS_ENDPOINTS.GET_USER_BINS_INFO);
  };

  /**
   * Récupérer toutes les informations de scan (admin)
   * @returns { ScanInfoResponse }
   */
  static GET_ALL_USERS_SCAN_INFO = () => {
    return ApiClient.get<ScanInfoResponse>(
      METRICS_ENDPOINTS.GET_ALL_USERS_SCAN_INFO,
    );
  };

  /**
   * Récupérer les informations de scan d'un utilisateur spécifique
   * @param id {number} L'ID de l'utilisateur
   * @returns { ScanInfoResponse }
   */
  static GET_USER_SCAN_INFO_BY_ID = (id: number) => {
    return ApiClient.get<ScanInfoResponse>(
      METRICS_ENDPOINTS.GET_USER_SCAN_INFO_BY_ID(id),
    );
  };

  /**
   * Récupérer tous les bins (admin)
   * @returns { BinInfoResponse }
   */
  static GET_ALL_USERS_BINS_INFO = () => {
    return ApiClient.get<BinInfoResponse>(
      METRICS_ENDPOINTS.GET_ALL_USERS_BINS_INFO,
    );
  };

  /**
   * Récupérer les bins d'un utilisateur spécifique
   * @param id {number} L'ID de l'utilisateur
   * @returns { BinInfoResponse }
   */
  static GET_USER_BINS_INFO_BY_ID = (id: number) => {
    return ApiClient.get<BinInfoResponse>(
      METRICS_ENDPOINTS.GET_USER_BINS_INFO_BY_ID(id),
    );
  };
}

export default MetricsManager;
