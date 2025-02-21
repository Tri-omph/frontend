import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ScanInfoResponse } from "@/services/managers/metricsManager";

interface ScanInfoProps {
  scanInfo: ScanInfoResponse | null;
  loading: boolean;
}

const ScanInfo: React.FC<ScanInfoProps> = ({ scanInfo, loading }) => {
  const [expanded, setExpanded] = useState(false);
  const [height] = useState(new Animated.Value(100)); // Initial height for the expandable section

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

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(height, {
      toValue: expanded ? 100 : 250, // Expand/contract the height
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.card, { height }]}>
      <TouchableOpacity style={styles.header} onPress={toggleExpand}>
        <Text style={styles.totalLabel}>Méthode préférée:</Text>
        <Text style={styles.totalNumber}>
          {getMostUsedMethod().toUpperCase()}
        </Text>
        <AntDesign
          name={expanded ? "upcircleo" : "downcircleo"}
          size={24}
          color="#388E3C"
        />
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#A8D08D", // Consistent light background color
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
    margin: 20,
    width: "58%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  totalLabel: {
    fontSize: 16,
    color: "#388E3C", // Green color for label
  },
  totalNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#388E3C", // Dark green color for the most used method
    marginHorizontal: 10,
  },
  detailsContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  mostUsedLabel: {
    fontSize: 16,
    color: "#388E3C", // Green color for "Usage Ratio" label
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
    borderBottomColor: "#B2DFDB", // Light green border for usage items
  },
  methodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#388E3C", // Dark green for method names
  },
  usageRatio: {
    fontSize: 16,
    color: "#333",
  },
});

export default ScanInfo;
