import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

type HistoricCardProps = {
  wasteImage?: string | null; // Changer le type de wasteImage pour accepter une chaîne ou null
  wasteType: string;
  wasteIdentificationMethod: string;
  targertedBin: string; // donne moi un nom de variable
  date: string; // TODO; à voir avec le back
};

const HistoricCard: React.FC<HistoricCardProps> = ({
  wasteImage,
  wasteType,
  wasteIdentificationMethod,
  targertedBin,
  date,
}) => (
  <View style={styles.historyItem}>
    <View style={styles.imagePlaceholder}>
      {/* Si wasteImage est disponible, on l'affiche. Sinon, on peut afficher une image par défaut */}
      {wasteImage && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${wasteImage}` }} // Pour afficher l'image en base64
          style={styles.image}
        />
      )}
    </View>
    <View style={styles.historyDetails}>
      <Text style={styles.itemType}>{wasteType}</Text>
      <Text style={styles.itemDate}>{date}</Text>
      <Text style={styles.itemDescription}>
        Trié dans la poubelle {targertedBin} grâce à {wasteIdentificationMethod}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
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
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    resizeMode: "cover",
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
});

export default HistoricCard;
