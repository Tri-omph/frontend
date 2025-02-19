import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "@/components/general/Header";
import FactCard from "@/components/user/FactCard";
import { useUserInformation } from "@/context/UserInformationContext";

const FactHeader: React.FC = () => {
  const { username } = useUserInformation();

  return (
    <View style={styles.container}>
      {/* Header avec le titre et le sous-titre */}
      <Header
        title={`${username} 👋`}
        subtitle="Rendons le monde plus propre !"
        imageSource={require("@/assets/images/growing-plant.jpg")}
      />

      {/* FactCard qui chevauche le Header */}
      <FactCard
        buttonText="Le saviez-vous ?"
        factText="Recycler une canette d’aluminium économise assez d’énergie pour alimenter une télévision pendant trois heures !"
        style={styles.factCard} // Applique le style pour chevaucher le Header
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  factCard: {
    position: "absolute", // Positionner FactCard au-dessus du Header
    top: 160, // Ajuster selon la hauteur du Header
    left: 0,
    right: 0,
    zIndex: 1, // S'assurer que FactCard soit au-dessus
  },
});

export default FactHeader;
