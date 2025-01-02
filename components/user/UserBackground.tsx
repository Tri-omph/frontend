import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

interface UserBackgroundProps {
  id: string;
  image: ImageSourcePropType;
  isSelected: boolean;
  onPress: () => void;
}

const UserBackground: React.FC<UserBackgroundProps> = ({
  id,
  image,
  isSelected,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.fondItem, isSelected && styles.selectedFond]}
    onPress={onPress}
  >
    <Image source={image} style={styles.fondImage} />
    <Text style={styles.fondText}>{id}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fondItem: {
    alignItems: "center",
    backgroundColor: "#d6ecd2",
    borderRadius: 10,
    marginVertical: 10,
    width: "90%",
    padding: 15,
  },
  selectedFond: {
    borderWidth: 2,
    borderColor: "green",
  },
  fondImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
  },
  fondText: {
    color: "#3d4653",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});

export default UserBackground;
