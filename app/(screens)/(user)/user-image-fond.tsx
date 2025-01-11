import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

import { useBackgroundContext } from "@/context/BackgroundContext";
import UserBackground from "@/components/user/UserBackground";
import { backgrounds } from "@/constants/Background";
import resources from "@/constants/Resources";

export default function UserImageFondScreen() {
  const { setSelectedBackground } = useBackgroundContext();
  const [selectedFond, setSelectedFond] = useState<unknown>(null);
  const router = useRouter();

  const handleValidate = () => {
    if (selectedFond) {
      setSelectedBackground(selectedFond);
      router.replace("/(tabs)");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={resources.monster_v1} style={styles.monster} />
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {backgrounds.map((fond, index) => (
          <UserBackground
            key={index}
            id={fond.id}
            image={fond.image}
            isSelected={selectedFond === fond.image}
            onPress={() => setSelectedFond(fond.image)}
          />
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
