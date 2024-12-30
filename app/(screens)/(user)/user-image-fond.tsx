import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useBackgroundContext } from "@/context/BackgroundContext";
import { useRouter } from "expo-router";

export default function UserImageFondScreen() {
  const { setSelectedBackground } = useBackgroundContext();
  const [selectedFond, setSelectedFond] = useState<unknown>(null);
  const router = useRouter();

  const fonds = [
    {
      id: "Jour de neige",
      image: require("@/assets/images/fond_neige.png"),
    },
    {
      id: "Nuit sous la neige",
      image: require("@/assets/images/fond_nuit.png"),
    },
    {
      id: "Coucher de soleil enneigé",
      image: require("@/assets/images/fond_coucher.png"),
    },
  ];

  const handleValidate = () => {
    if (selectedFond) {
      setSelectedBackground(selectedFond);
      router.replace("/(tabs)");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/monstre_v1.png")}
          style={styles.monster}
        />
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {fonds.map((fond) => (
          <TouchableOpacity
            key={fond.id}
            style={[
              styles.fondItem,
              selectedFond === fond.image && styles.selectedFond,
            ]}
            onPress={() => setSelectedFond(fond.image)}
          >
            <Image source={fond.image} style={styles.fondImage} />
            <Text style={styles.fondText}>{fond.id}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.validateButton}
          onPress={handleValidate}
        >
          <Text style={styles.validateButtonText}>Valider votre choix</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8F4",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E8F4E1",
  },
  monster: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  body: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
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
  validateButton: {
    backgroundColor: "#6AA84F",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  validateButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    backgroundColor: "#FFF",
    padding: 5,
    borderTopWidth: 0,
    borderTopColor: "#DDD",
    alignItems: "center",
  },
});
