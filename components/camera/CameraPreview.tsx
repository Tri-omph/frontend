import React from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { CameraCapturedPicture } from "expo-camera";

type CameraPreviewProps = {
  photo: CameraCapturedPicture;
  retakePicture: () => void;
  keepPicture: () => void;
};

const CameraPreview: React.FC<CameraPreviewProps> = ({
  photo,
  retakePicture,
  keepPicture,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={styles.imageBackground}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={retakePicture} style={styles.button}>
            <Text style={styles.buttonText}>Reprendre</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={keepPicture} style={styles.button}>
            <Text style={styles.buttonText}>Garder</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CameraPreview;
