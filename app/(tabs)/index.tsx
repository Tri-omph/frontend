import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Pressable,
  Text,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Link } from "expo-router";
import { routes } from "@/routes/routes";

export default function TabOneScreen() {
  const colorScheme = useColorScheme();

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

      <View style={styles.iconContainer}>
        <Link href={routes.USER.SETTINGS.getHref()} asChild>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="user-o"
                size={25}
                color={Colors[colorScheme ?? "light"].text}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      </View>

      <View style={styles.monsterContainer}>
        <Image
          source={require("@/assets/images/monstre_v1.png")}
          style={styles.monster}
        />
      </View>
      <Link href={routes.TABS.SCAN.getHref()} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Scanne-moi !</Text>
        </Pressable>
      </Link>
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
  iconContainer: {
    position: "absolute",
    top: 20,
    right: 20,
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
