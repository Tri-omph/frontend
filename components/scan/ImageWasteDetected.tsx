import React from "react";
import { View, Text, StyleSheet, ImageSourcePropType } from "react-native";
import ContentWithImage from "@/components/scan/ContentWithImage";

type ImageWasteDetectedProps = {
  image: ImageSourcePropType | null;
};

const ImageWasteDetected: React.FC<ImageWasteDetectedProps> = ({ image }) => {
  return (
    <View style={styles.container}>
      <ContentWithImage
        title="Votre photo"
        subtitle={`Prise le ${new Date().toLocaleDateString()}`}
        image={image}
      >
        {/* Injection du texte de description */}
        <Text style={styles.descriptionText}>
          Votre photo (ne) sera (pas) stockée.{"\n"}Pour plus d’informations,
          voir les autorisations accordées à l’application.
        </Text>
      </ContentWithImage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: "gray",
  },
});

export default ImageWasteDetected;
