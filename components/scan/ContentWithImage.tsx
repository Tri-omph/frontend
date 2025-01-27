import React from "react";
import { View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import TitleAndSubtitle from "@/components/scan/TitleAndSubtitle";

type ContentWithImageProps = {
  title: string;
  subtitle: string;
  image: ImageSourcePropType | { uri: string };
  children?: React.ReactNode;
};

const ContentWithImage: React.FC<ContentWithImageProps> = ({
  title,
  subtitle,
  image,
  children,
}) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.columnContainer}>
        <TitleAndSubtitle title={title} subtitle={subtitle} />
        {children}
      </View>
      <Image source={image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 10,
  },
  columnContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
  },
  image: {
    width: 80,
    height: "80%",
    marginRight: 8,
    marginTop: 15,
    borderRadius: 12,
  },
});

export default ContentWithImage;
