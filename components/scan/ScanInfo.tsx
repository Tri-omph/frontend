import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ScanInfoResponse } from "@/services/managers/metricsManager";

interface ScanInfoProps {
  scanInfo: ScanInfoResponse | null;
  loading: boolean;
}

const ScanInfo: React.FC<ScanInfoProps> = ({ scanInfo, loading }) => {
  const [expanded, setExpanded] = useState(false);

  const getUsageRatio = (method: keyof typeof scanInfo) => {
    if (!scanInfo || !scanInfo[method]) return "N/A";
    const { correct, total } = scanInfo[method];
    return total > 0 ? ((correct / total) * 100).toFixed(1) + "%" : "0%";
  };

  const getMostUsedMethod = () => {
    if (!scanInfo) return "N/A";
    return Object.entries(scanInfo).reduce((maxMethod, [method, data]) => {
      return data.correct > (scanInfo[maxMethod]?.correct || 0)
        ? method
        : maxMethod;
    }, "ai");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.totalLabel}>Méthode la plus utilisée:</Text>
        <Text style={styles.totalNumber}>
          {getMostUsedMethod().toUpperCase()}
        </Text>
        <AntDesign name={expanded ? "up" : "down"} size={20} color="#4CAF50" />
      </TouchableOpacity>

      {expanded && scanInfo && (
        <View style={styles.detailsContainer}>
          <Text style={styles.mostUsedLabel}>Ratio de bonne utilisation :</Text>
          <View style={styles.usageContainer}>
            {Object.entries(scanInfo).map(([method, data]) => (
              <View key={method} style={styles.usageItem}>
                <Text style={styles.methodName}>{method.toUpperCase()}</Text>
                <Text style={styles.usageRatio}>{getUsageRatio(method)}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#E0F7E9", // Couleur de fond plus douce en vert
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: "center",
    margin: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  totalLabel: {
    fontSize: 16,
    color: "#4CAF50", // Couleur du texte pour "Méthode la plus utilisée" en vert
  },
  totalNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#388E3C", // Couleur du nombre en vert plus foncé
    marginHorizontal: 10,
  },
  detailsContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  mostUsedLabel: {
    fontSize: 16,
    color: "#4CAF50", // Couleur du texte "Ratio de bonne utilisation" en vert
  },
  usageContainer: {
    marginTop: 10,
    width: "100%",
  },
  usageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#B2DFDB", // Une bordure subtile vert clair
  },
  methodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#388E3C", // Vert foncé pour les noms de méthode
  },
  usageRatio: {
    fontSize: 16,
    color: "#333",
  },
});

export default ScanInfo;
