import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  ImageURISource,
} from "react-native";
import { router } from "expo-router";

import BottomSheet from "@gorhom/bottom-sheet";
import TypeWasteDetected from "@/components/scan/TypeWasteDetected";
import ImageWasteDetected from "@/components/scan/ImageWasteDetected";
import SortingTrashCan from "@/components/scan/SortingTrashCan";
import getBinToThrowIn from "@/utils/bin/BinToThrowIn";
import useFileSystem from "@/hooks/useFileSystem";

type ScanResultScreenProps = {
  material: string; // Le matériau du produit (ex : "aluminium")
  detectionMethod: string; // La méthode de détection (ex : "Code barre")
  imageOfWaste: ImageSourcePropType | { uri: string };
  onDismiss?: () => void;
};

const ScanResultScreen: React.FC<ScanResultScreenProps> = ({
  material,
  detectionMethod,
  imageOfWaste,
  onDismiss,
}) => {
  const { saveImageLocally } = useFileSystem();
  const { nameOfBin, imageOfBin } = getBinToThrowIn(material);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetState, setBottomSheetState] = useState({
    snapPoints: ["30%"],
    showAdditionalComponents: false,
  });

  const handleThumbUp = () => {
    setBottomSheetState({
      snapPoints: ["30%", "80%"],
      showAdditionalComponents: true,
    });
    setTimeout(() => {
      bottomSheetRef.current?.expand();
    }, 100); // Délai nécessaire pour garantir l'ajout du deuxième snapoints dans la liste avec d'étendre le composant.
  };

  const handleSheetClose = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={bottomSheetState.snapPoints}
      enableDynamicSizing={false} // Sans cela, le bottomSheet ne s'affiche pas, il semblerait que cela soit à cause de expo 52,
      enablePanDownToClose={true}
      onClose={handleSheetClose}
      style={{ borderRadius: 20, overflow: "hidden" }}
      handleIndicatorStyle={{
        width: 100,
        backgroundColor: "#ccc",
      }}
    >
      <View style={styles.contentContainer}>
        <TypeWasteDetected
          title={`Emballage en ${material}`}
          subtitle="Méthode de détection"
          activeMethod={detectionMethod}
          askUserFeedback={true}
          onThumbUp={handleThumbUp}
          onThumbDown={async () => {
            if ((imageOfWaste as ImageURISource) !== undefined) {
              console.log("it should work !");
              const localUri = await saveImageLocally(
                (imageOfWaste as ImageURISource).uri,
              );
              bottomSheetRef.current?.close();
              router.replace({
                pathname: "/advanced-research",
                params: {
                  imageOfWasteToCorrect: localUri,
                },
              });
            }
          }}
        />

        {bottomSheetState.showAdditionalComponents && (
          <>
            <View style={styles.separator} />
            <ImageWasteDetected
              title="Votre photo"
              subtitle="prise le {date téléphone}"
              image={imageOfWaste}
            />

            <View style={styles.separator} />
            <SortingTrashCan
              title={`Poubelle ${nameOfBin}`}
              subtitle="Déposez ici votre objet"
              bin={nameOfBin}
              image={imageOfBin}
              material={material}
              methodUsed={detectionMethod}
              wasteImage={
                typeof imageOfWaste === "object"
                  ? imageOfWaste.uri
                  : imageOfWaste
              }
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
