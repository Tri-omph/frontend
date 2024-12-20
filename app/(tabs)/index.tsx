import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Pressable,
  Text,
} from "react-native";

export default function TabOneScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/background_index.png")}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo_viveris.png")}
          style={styles.logo}
        />
        <Image
          source={require("@/assets/images/logo_triomph.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.monsterContainer}>
        <Image
          source={require("@/assets/images/monstre_v1.png")}
          style={styles.monster}
        />
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Scanne-moi !</Text>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    position: "absolute",
    top: 0,
    width: "100%",
    height: "10%",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  monsterContainer: {
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: [{ translateX: -150 }, { translateY: -200 }],
  },
  monster: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  button: {
    position: "absolute",
    bottom: "10%",
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
