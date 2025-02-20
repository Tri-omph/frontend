import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import HistoricCard from "@/components/search/HistoricCard";
import { useHistory } from "@/hooks/useHistory";
import { RefreshControl } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import BinInfo from "@/components/bins/BinInfo";
import ScanInfo from "@/components/scan/ScanInfo";

export default function TabHistoryScreen() {
  const { history, fetchUserHistory, loading } = useHistory();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUserHistory();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <BinInfo />
      <ScanInfo />
      <Text style={styles.header}>Votre historique</Text>

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

      <View style={styles.advancedSearch}>
        <Text style={styles.advancedTitle}>Mode recherche avancée</Text>
        <Text style={styles.advancedDescription}>
          Quelques informations indispensables …{"\n\n"}
          Vous n’êtes pas obligé d’utiliser le scan ou l’appareil photo : le
          mode de “Recherche avancée” vous permet de décrire le déchet que vous
          souhaitez trier !
        </Text>
        <TouchableOpacity style={styles.advancedButton}>
          <Text style={styles.advancedButtonText}>
            Utiliser la recherche avancée
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
}

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
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#EAEAEA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  imageText: {
    color: "#AAAAAA",
    fontSize: 12,
  },
  historyDetails: {
    flex: 1,
  },
  itemType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
  },
  itemDate: {
    fontSize: 14,
    color: "#777777",
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: "#6AA84F",
  },
  advancedSearch: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    resizeMode: "cover",
  },
  advancedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  advancedDescription: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 20,
  },
  advancedButton: {
    backgroundColor: "#6AA84F",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  advancedButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
