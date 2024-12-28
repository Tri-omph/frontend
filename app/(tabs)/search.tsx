import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

export default function TabOneScreen() {
  const data = [
    {
      type: "PLASTIQUE",
      date: "le 19/11/2024",
      poubelle: "Poubelle (jaune) grâce à {méthode}",
    },
    {
      type: "PAPIER",
      date: "le 20/11/2024",
      poubelle: "Poubelle (bleu) grâce à {méthode}",
    },
    {
      type: "ALUMINIUM",
      date: "le 23/11/2024",
      poubelle: "Poubelle jaune grâce à {méthode}",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Votre historique</Text>

      <ScrollView contentContainerStyle={styles.historyList}>
        {data.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <View style={styles.imagePlaceholder}>
              <Image
                source={require("@/assets/images/canette-coca.jpg")}
                style={styles.image}
              />
            </View>
            <View style={styles.historyDetails}>
              <Text style={styles.itemType}>{item.type}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
              <Text style={styles.itemDescription}>{item.poubelle}</Text>
            </View>
          </View>
        ))}
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
