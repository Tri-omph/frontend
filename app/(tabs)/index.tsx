import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Pressable,
  Text,
  Dimensions,
  ScaledSize,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Link } from "expo-router";
import { routes } from "@/routes/routes";
import Snowflake from "../../components/snowflake";
import { useState, useEffect } from "react";

const fullDimensions = Dimensions.get("window");

export default function Snow({
  snowflakesCount = 100,
  fallSpeed = "medium",
  fullScreen = false,
}: {
  snowflakesCount?: number;
  fallSpeed?: "slow" | "medium" | "fast";
  fullScreen?: boolean;
}) {
  const [scene, setScene] = useState<ScaledSize | null>(null);
  const [showEyesOpen, setShowEyesOpen] = useState(true);
  const colorScheme = useColorScheme();
  const dimensionsStyle = fullScreen
    ? fullDimensions
    : styles.stretchDimensions;

  useEffect(() => {
    const intervalEyesOpen = setInterval(() => {
      setShowEyesOpen(true);
    }, 1000);

    const intervalEyesClosed = setInterval(() => {
      setShowEyesOpen(false);
    }, 2500);

    return () => {
      clearInterval(intervalEyesOpen);
      clearInterval(intervalEyesClosed);
    };
  }, []);

  const onLayout = ({
    nativeEvent: {
      layout: { width, height },
    },
  }: {
    nativeEvent: { layout: { width: number; height: number } };
  }) => {
    if (!fullScreen) {
      setScene({ width, height, scale: 1, fontScale: 1 });
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/fond_neige.png")}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo_viveris.png")}
          style={styles.logo}
        />
        <Image
          source={require("@/assets/images/logo_triomph.png")}
          style={[styles.logo, { left: -50 }]}
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
          source={
            showEyesOpen
              ? require("@/assets/images/monster_noel.png")
              : require("@/assets/images/monster_noel_eyes_closed.png")
          }
          style={styles.monster}
        />
      </View>

      <Link href={routes.TABS.SCAN.getHref()} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Scanne-moi !</Text>
        </Pressable>
      </Link>

      <View style={[styles.container, dimensionsStyle]} onLayout={onLayout}>
        {!!scene &&
          new Array(snowflakesCount)
            .fill(true)
            .map((_, i) => (
              <Snowflake key={i} scene={scene} fallSpeed={fallSpeed} />
            ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  stretchDimensions: {
    width: "100%",
    height: "100%",
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
    top: "75%",
    left: "52.5%",
    transform: [{ translateX: -150 }, { translateY: -200 }],
  },
  monster: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  button: {
    position: "absolute",
    bottom: "5%",
    left: "28%",
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
