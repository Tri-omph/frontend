import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const PlayerManagementScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));

  const showDetails = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleSearch = () => {
    showDetails();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Recherche de Joueur</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Entrez un pseudo..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
      />

      <Animated.View style={[styles.playerDetails, { opacity: fadeAnim }]}>
        <Text style={styles.detailsText}>
          <FontAwesome name="user" size={20} color="#6AA84F" /> Pseudo :
          Player123
        </Text>
        <Text style={styles.detailsText}>
          <FontAwesome name="star" size={20} color="#FFD700" /> Points : 1200
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.warningButton]}
            onPress={() => alert("Avertissement envoyé !")}
          >
            <FontAwesome name="exclamation-triangle" size={20} color="#FFF" />
            <Text style={styles.actionText}>Avertir</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.sanctionButton]}
            onPress={() => alert("Sanction appliquée !")}
          >
            <FontAwesome name="ban" size={20} color="#FFF" />
            <Text style={styles.actionText}>Sanctionner</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  searchBar: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerDetails: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
  },
  warningButton: {
    backgroundColor: "#FFA726",
  },
  sanctionButton: {
    backgroundColor: "#E53935",
  },
  actionText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default PlayerManagementScreen;
