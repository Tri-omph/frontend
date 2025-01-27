import React from "react";
import { View, Text, StyleSheet, ImageSourcePropType } from "react-native";
import ContentWithImage from "@/components/scan/ContentWithImage";

type ImageWasteDetectedProps = {
  title: string; // Titre principal
  subtitle: string; // Titre secondaire
  image: ImageSourcePropType | { uri: string };
};

const ImageWasteDetected: React.FC<ImageWasteDetectedProps> = ({
  title,
  subtitle,
  image,
}) => {
  return (
    <View style={styles.container}>
      <ContentWithImage title={title} subtitle={subtitle} image={image}>
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
