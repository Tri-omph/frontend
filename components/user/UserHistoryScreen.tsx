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

      <View style={styles.infocontainer}>
        <BinInfo bins={bins} loading={binLoading} />
        <View style={styles.scanInfoStyle}>
          <ScanInfo scanInfo={scanInfo} loading={binLoading} />
        </View>
      </View>

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
              wasteImage={item.image ? item.image : null}
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
    padding: 5,
  },
  infocontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
  },
  scanInfoStyle: {
    alignSelf: "flex-start", // S'assurer que ScanInfo est bien aligné en haut
    marginTop: -17, // Ajuster la position verticale si nécessaire
  },
});

export default UserHistoryScreen;
