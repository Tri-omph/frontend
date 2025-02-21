import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import HistoricCard from "@/components/search/HistoricCard";
import { useHistory } from "@/hooks/useHistory";
import Toast from "react-native-toast-message";
import BinInfo from "@/components/bins/BinInfo";
import ScanInfo from "@/components/scan/ScanInfo";
import { useMetrics } from "@/hooks/useMetrics";
import { useAdminUserActions } from "@/hooks/useAdminActions";

const AdminUserHistoryScreen: React.FC<{
  id: number;
  hasWarnings?: boolean;
}> = ({ id, hasWarnings }) => {
  const { history, fetchHistoryById, loading } = useHistory();
  const {
    fetchUserBins,
    fetchUserScanInfo,
    bins,
    scanInfo,
    loading: binLoading,
  } = useMetrics();
  const { userWarnings, fetchUserWarnings } = useAdminUserActions();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchHistoryById(id);
    await fetchUserBins(id);
    await fetchUserScanInfo(id);
    if (hasWarnings) await fetchUserWarnings(id);
    setRefreshing(false);
  };

  // Fusionner et trier les données par date
  const sortedEvents = useMemo(() => {
    const events = [
      ...(history?.map((item) => ({
        type: "history",
        date: new Date(item.date),
        data: item,
      })) || []),
      ...(hasWarnings && userWarnings
        ? userWarnings.map((warning) => ({
            type: "warning",
            date: new Date(warning.createdAt),
            data: warning,
          }))
        : []),
    ];
    return events.sort((a, b) => a.date - b.date);
  }, [history, userWarnings, hasWarnings]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profil de l'utilisateur</Text>
      <BinInfo bins={bins} loading={binLoading} />
      <ScanInfo scanInfo={scanInfo} loading={binLoading} />
      <Text style={styles.header}>Historique et Avertissements</Text>
      <ScrollView
        contentContainerStyle={styles.historyList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {loading ? (
          <Text>Chargement...</Text>
        ) : sortedEvents.length > 0 ? (
          sortedEvents.map((event, index) =>
            event.type === "history" ? (
              <HistoricCard
                key={`history-${index}`}
                wasteImage={{ uri: event.data.image }}
                wasteType={event.data.type}
                date={event.data.date}
                wasteIdentificationMethod={event.data.method}
                targertedBin={event.data.poubelle}
              />
            ) : (
              <View key={`warning-${index}`} style={styles.warningCard}>
                <Text style={styles.warningTitle}>⚠️ Avertissement</Text>
                <Text>Code-barres: {event.data.barcode}</Text>
                <Text>Nombre de scans suspects: {event.data.scanCount}</Text>
                <Text>Date: {event.data.createdAt}</Text>
              </View>
            ),
          )
        ) : (
          <Text>Aucune donnée disponible.</Text>
        )}
      </ScrollView>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
  },
  historyList: {
    marginBottom: 20,
  },
  warningCard: {
    backgroundColor: "#FFCDD2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D32F2F",
    marginBottom: 5,
  },
});

export default AdminUserHistoryScreen;
