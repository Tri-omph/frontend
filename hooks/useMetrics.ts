import { useState } from "react";
import { showNotification } from "@/constants/notification";
import MetricsManager, {
  ScanInfoResponse,
  BinInfoResponse,
} from "@/services/managers/metricsManager";

export const useMetrics = () => {
  const [loading, setLoading] = useState(false);
  const [scanInfo, setScanInfo] = useState<ScanInfoResponse | null>(null);
  const [bins, setBins] = useState<BinInfoResponse | null>(null);

  const fetchCurrentUserScanInfo = async () => {
    try {
      setLoading(true);
      const res = await MetricsManager.GET_USER_SCAN_INFO();

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      setScanInfo(res.data);
    } catch (error) {
      showNotification(
        "error",
        "Impossible de récupérer les scans.",
        error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUserBins = async () => {
    try {
      setLoading(true);
      const res = await MetricsManager.GET_USER_BINS_INFO();

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      setBins(res.data);
    } catch (error) {
      showNotification(
        "error",
        "Impossible de récupérer les bins.",
        error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchAllScanInfo = async () => {
    try {
      setLoading(true);
      const res = await MetricsManager.GET_ALL_USERS_SCAN_INFO();

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      setScanInfo(res.data);
    } catch (error) {
      showNotification(
        "error",
        "Impossible de récupérer tous les scans.",
        error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchUserScanInfo = async (id: number) => {
    try {
      setLoading(true);
      const res = await MetricsManager.GET_USER_SCAN_INFO_BY_ID(id);

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      setScanInfo(res.data);
    } catch (error) {
      showNotification(
        "error",
        `Impossible de récupérer les scans de l'utilisateur ${id}.`,
        error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBins = async () => {
    try {
      setLoading(true);
      const res = await MetricsManager.GET_ALL_USERS_BINS_INFO();

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      setBins(res.data);
    } catch (error) {
      showNotification(
        "error",
        "Impossible de récupérer tous les bins.",
        error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBins = async (id: number) => {
    try {
      setLoading(true);
      const res = await MetricsManager.GET_USER_BINS_INFO_BY_ID(id);

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      setBins(res.data);
    } catch (error) {
      showNotification(
        "error",
        `Impossible de récupérer les bins de l'utilisateur ${id}.`,
        error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    // State
    loading,
    scanInfo,
    bins,

    // Actions
    fetchCurrentUserScanInfo,
    fetchCurrentUserBins,

    fetchUserScanInfo,
    fetchUserBins,

    fetchAllScanInfo,
    fetchAllBins,
  };
};
