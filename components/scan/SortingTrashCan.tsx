import React, { useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import ContentWithImage from "@/components/scan/ContentWithImage";
import { Swipeable } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSorting } from "@/hooks/useSorting";
import BottomSheet from "@gorhom/bottom-sheet";
import { useHistory } from "@/hooks/useHistory";
import { detectionMethod } from "@/types/detectionMethods";
import getBinToThrowIn from "@/utils/bin/BinToThrowIn";

type SortingTrashCanProps = {
  material: string;
  methodUsed: detectionMethod;
  bottomSheetRef: React.RefObject<BottomSheet>; // Permet de fermer le bottomSheet une fois, le tri effectué
};

const SortingTrashCan: React.FC<SortingTrashCanProps> = ({
  material,
  methodUsed,
  bottomSheetRef,
}) => {
  const { sortAndReward } = useSorting();
  const swipeableRef = useRef<Swipeable>(null);
  const { addIntoHistory } = useHistory();

  // Récupérer la poubelle et son image en utilisant la fonction getBinToThrowIn
  const { nameOfBin, imageOfBin } = getBinToThrowIn(material);

  const handleSwipeRight = async () => {
    await addIntoHistory({
      method: methodUsed,
      isValid: true,
      poubelle: nameOfBin,
      type: material,
    });

    await sortAndReward(); // C'est trié donc je ferme le bottomSheet !
    bottomSheetRef.current?.close(); // ✅ Ferme le BottomSheet

    swipeableRef.current?.close();
  };

  const handleSwipeLeft = () => {
    // Action pour le swipe à gauche, équivalent à "Indisponible"
    Alert.alert(
      "Indisponible",
      "Cet objet est désormais marqué comme indisponible.",
    );
    swipeableRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <ContentWithImage
        title={`Poubelle ${nameOfBin}`}
        subtitle="Déposer ici votre déchet"
        image={imageOfBin}
      >
        <Swipeable
          ref={swipeableRef}
          renderRightActions={() => (
            <View style={styles.rightAction}>
              <Text style={styles.actionText}>C'est trié</Text>
            </View>
          )}
          renderLeftActions={() => (
            <View style={styles.leftAction}>
              <Text style={styles.actionText}>Indisponible</Text>
            </View>
          )}
          onSwipeableRightOpen={handleSwipeRight}
          onSwipeableLeftOpen={handleSwipeLeft}
          containerStyle={styles.swipeableContainer}
        >
          <TouchableOpacity style={styles.button}>
            <FontAwesome name="arrow-left" size={20} color="#fff" />
            <Text style={styles.buttonText}> Glisser </Text>
            <FontAwesome name="arrow-right" size={20} color="#fff" />
          </TouchableOpacity>
        </Swipeable>
      </ContentWithImage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  leftAction: {
    flex: 1,
    backgroundColor: "#dd2150", // Fond noir pour "Indisponible"
    borderRadius: 25, // Bords arrondis
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
  },
  rightAction: {
    flex: 1,
    backgroundColor: "#4CAF50", // Fond vert pour "C'est trié"
    borderRadius: 25, // Bords arrondis
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 20,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
  },
  swipeableContainer: {
    width: 220, // Limiter la largeur du Swipeable à 100 pixels
    height: 55,
  },
  button: {
    backgroundColor: "#000", // Fond noir
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25, // Bords arrondis
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row", // Alignement horizontal
    height: 55,
  },
  buttonText: {
    color: "#fff", // Texte blanc
    fontWeight: "600",
  },
});

export default SortingTrashCan;
