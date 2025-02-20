import React from "react";
import {
  Text,
  ImageBackground,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  imageSource?: ImageSourcePropType;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, imageSource }) => {
  return (
    <ImageBackground
      source={imageSource ?? require("@/assets/images/growing-plant.jpg")}
      style={styles.header}
    >
      <Text style={styles.headerTitle}>{title ?? ""}</Text>
      <Text style={styles.headerSubtitle}>{subtitle ?? ""}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 250,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    top: 20,
    left: 20,
    textAlign: "left",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "white",
    position: "absolute",
    top: 50,
    left: 20,
    textAlign: "left",
  },
});

export default Header;
