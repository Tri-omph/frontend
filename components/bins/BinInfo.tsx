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
import { BinInfoResponse } from "@/services/managers/metricsManager";

interface BinInfoProps {
  bins: BinInfoResponse | null;
  loading: boolean;
}

const BinInfo: React.FC<BinInfoProps> = ({ bins, loading }) => {
  const [expanded, setExpanded] = useState(false);
  const [height] = useState(new Animated.Value(100)); // Initial height

  const getTotalBins = () => {
    if (!bins) return 0;
    return Object.values(bins).reduce((total, num) => total + num, 0);
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
    return <ActivityIndicator size="large" color="#007BFF" />;
  }

  return (
    <Animated.View style={[styles.binBox, { height }]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.toggleButton}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalNumber}>{getTotalBins()}</Text>
          <Text style={styles.totalLabel}>déchets triés</Text>
        </View>

        <AntDesign
          name={expanded ? "upcircleo" : "downcircleo"}
          size={24}
          color="#333"
        />
      </TouchableOpacity>

      {/* Affichage conditionnel du contenu */}
      {expanded && bins && Object.entries(bins).length > 0 ? (
        <Text style={styles.binsContainer}>
          {Object.entries(bins)
            .map(([binType, count]) => `${binType}: ${count}`)
            .join("\n")}
        </Text>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  binBox: {
    width: "50%",
    backgroundColor: "#D1E7FF", // Fond blanc pour la boîte de contenu
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
    position: "relative", // Pour positionner la flèche dans cette boîte
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
    color: "#555",
  },
  totalNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginRight: 10,
  },
  binsContainer: {
    marginTop: 73,
    width: "100%",
  },
  toggleButton: {
    position: "absolute", // Fixe la flèche en haut à droite de binBox
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
    color: "#D1E7FF",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BinInfo;
