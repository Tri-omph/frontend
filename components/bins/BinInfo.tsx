import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BinInfoResponse } from "@/services/managers/metricsManager";

interface BinInfoProps {
  bins: BinInfoResponse | null;
  loading: boolean;
}

const BinInfo: React.FC<BinInfoProps> = ({ bins, loading }) => {
  const [expanded, setExpanded] = useState(false);

  const getTotalBins = () => {
    if (!bins) return 0;
    return Object.values(bins).reduce((total, num) => total + num, 0);
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
        <Text style={styles.totalLabel}>Nombre total de déchets triés</Text>
        <Text style={styles.totalNumber}>{getTotalBins()}</Text>
        <AntDesign name={expanded ? "up" : "down"} size={20} color="#007BFF" />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.binsContainer}>
          {bins &&
            Object.entries(bins).map(([binType, count]) => (
              <View key={binType} style={styles.binItem}>
                <Text style={styles.binType}>{binType}</Text>
                <Text style={styles.binCount}>{count}</Text>
              </View>
            ))}
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
    backgroundColor: "#E9F4FF",
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
    color: "#555",
  },
  totalNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginHorizontal: 10,
  },
  binsContainer: {
    marginTop: 15,
    width: "100%",
  },
  binItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  binType: {
    fontSize: 16,
    color: "#007BFF",
  },
  binCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default BinInfo;
