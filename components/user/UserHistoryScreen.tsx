import React, { useState } from "react";
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

const UserHistoryScreen = () => {
  const { history, fetchUserHistory, loading } = useHistory();
  const {
    bins,
    scanInfo,
    loading: binLoading,
    fetchCurrentUserBins,
    fetchCurrentUserScanInfo,
  } = useMetrics();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUserHistory();
    await fetchCurrentUserBins();
    await fetchCurrentUserScanInfo();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profil de l'utilisateur</Text>
      <BinInfo bins={bins} loading={binLoading} />
      <ScanInfo scanInfo={scanInfo} loading={binLoading} />
      <Text style={styles.header}>Historique</Text>
      <ScrollView
        contentContainerStyle={styles.historyList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {loading ? (
          <Text>Chargement...</Text>
        ) : history && history.length > 0 ? (
          history.map((item, index) => (
            <HistoricCard
              key={index}
              wasteImage={{ uri: item.image }}
              wasteType={item.type}
              date={item.date}
              wasteIdentificationMethod={item.method}
              targertedBin={item.poubelle}
            />
          ))
        ) : (
          <Text>Aucun historique disponible.</Text>
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
});

export default UserHistoryScreen;
