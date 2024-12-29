import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function UserImageFondScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.fondItem}>
          <Image
            source={require("@/assets/images/fond_neige.png")}
            style={styles.fondImage}
          />
          <Text style={styles.fondText}>Fond 1</Text>
        </View>

        <View style={styles.fondItem}>
          <Image
            source={require("@/assets/images/fond_neige.png")}
            style={styles.fondImage}
          />
          <Text style={styles.fondText}>Fond 2</Text>
        </View>

        <View style={styles.fondItem}>
          <Image
            source={require("@/assets/images/fond_neige.png")}
            style={styles.fondImage}
          />
          <Text style={styles.fondText}>Fond 3</Text>
        </View>

        {/* Bouton valider */}
        <TouchableOpacity style={styles.validateButton}>
          <Text style={styles.validateButtonText}>Valider votre choix</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#333",
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
    backgroundColor: "#000",
    borderRadius: 10,
    marginVertical: 10,
    width: "90%",
    padding: 15,
  },
  fondImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
  },
  fondText: {
    color: "#FFF",
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
    marginTop: 30,
  },
  validateButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
