import React, { useRef, useState } from "react";
import { View, StyleSheet, ImageSourcePropType } from "react-native";
import { router } from "expo-router";

import BottomSheet from "@gorhom/bottom-sheet";
import TypeWasteDetected from "@/components/scan/TypeWasteDetected";
import ImageWasteDetected from "@/components/scan/ImageWasteDetected";
import SortingTrashCan from "@/components/scan/SortingTrashCan";
import { useScan } from "@/hooks/useScan";

type ScanResultScreenProps = {
  imageOfWaste: ImageSourcePropType | null;
  onDismiss?: () => void;
  askUserFeedBack?: boolean;
};

const ScanResultScreen: React.FC<ScanResultScreenProps> = ({
  onDismiss,
  askUserFeedBack,
}) => {
  // ***** UTILISATION DU CONTEXT (/!\ En passant par le hooks useScan)
  const { material, methodUsed, imageOfWaste } = useScan();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetState, setBottomSheetState] = useState({
    snapPoints: ["30%"],
    showAdditionalComponents: false,
  });

  // ***** GESTION DE L'OUVERTURE/FERMETURE DU BOTTOMSHEET

  // L'utilisateur est d'accord avec le résultat fourni par le scan ! => Alors on affiche les informations
  // supplémentaires
  const handleThumbUp = () => {
    setBottomSheetState({
      snapPoints: ["30%", "80%"],
      showAdditionalComponents: true,
    });
    setTimeout(() => {
      bottomSheetRef.current?.expand();
    }, 100); // Délai nécessaire pour garantir l'ajout du deuxième snapoints dans la liste avec d'étendre le composant.
  };

  // L'utilisateur n'est pas d'accord avec le résultat fourni par le scan !
  // On passe alors en mode recherche avancée !
  const handleThumbDown = async () => {
    bottomSheetRef.current?.close();
    router.replace("/advanced-research"); // L'expérience montre que pour ce cas, utiliser replace est plus fluide ...
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={bottomSheetState.snapPoints}
      enableDynamicSizing={false} // Sans cela, le bottomSheet ne s'affiche pas, il semblerait que cela soit à cause de expo 52,
      enablePanDownToClose={true}
      onClose={onDismiss || undefined}
      style={{ borderRadius: 20, overflow: "hidden" }}
      handleIndicatorStyle={{
        width: 100,
        backgroundColor: "#ccc",
      }}
    >
      <View style={styles.contentContainer}>
        <TypeWasteDetected
          title={`Emballage en ${material}`}
          activeMethod={methodUsed}
          askUserFeedback={askUserFeedBack || true}
          onThumbUp={handleThumbUp}
          onThumbDown={handleThumbDown}
        />

        {bottomSheetState.showAdditionalComponents && (
          <>
            <View style={styles.separator} />
            <ImageWasteDetected image={imageOfWaste} />

            <View style={styles.separator} />
            <SortingTrashCan
              material={material}
              methodUsed={methodUsed}
              bottomSheetRef={bottomSheetRef}
            />
          </>
        )}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "flex-start", // Aligne les enfants vers le haut
  },
  separator: {
    height: 1, // Épaisseur de la ligne
    backgroundColor: "#ccc", // Couleur de la ligne
  },
});

export default ScanResultScreen;
