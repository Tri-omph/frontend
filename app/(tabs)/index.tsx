import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  ImageBackground,
  ScaledSize,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { routes } from "@/routes/routes";

import Snowflake from "../../components/snowflake";
import { useBackgroundContext } from "@/context/BackgroundContext";
import { useUserInformation } from "@/context/UserInformationContext";

const fullDimensions = Dimensions.get("window");

export default function IndexPage({
  snowflakesCount = 100,
  fallSpeed = "medium",
  fullScreen = false,
}: {
  snowflakesCount?: number;
  fallSpeed?: "slow" | "medium" | "fast";
  fullScreen?: boolean;
}) {
  // Accessing background context and font size context
  const { selectedBackground } = useBackgroundContext();

  const [scene, setScene] = useState<ScaledSize | null>(null);
  const [showEyesOpen, setShowEyesOpen] = useState(true);

  const { monsterImage, monsterImageClosed } = useUserInformation();

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
    <ImageBackground source={selectedBackground} style={styles.container}>
      {/* Background with rounded corners for header */}
      <View style={styles.headerBackground}>
        <View style={styles.headerContent}>
          <Image
            source={require("@/assets/images/logo_viveris.png")}
            style={styles.logo}
          />
          <Image
            source={require("@/assets/images/logo_triomph.png")}
            style={[styles.logo, { left: -50 }]}
          />
          <View style={styles.iconContainer}>
            <Link href={routes.USER.SETTINGS.getHref()} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="user-o"
                    size={25}
                    color="#FFF"
                    style={styles.iconStyle}
                  />
                )}
              </Pressable>
            </Link>
          </View>
        </View>
      </View>

      <View style={styles.monsterContainer}>
        <Image
          source={showEyesOpen ? monsterImage : monsterImageClosed}
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
  headerBackground: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "absolute",
    top: 0,
    zIndex: 1,
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    right: 0,
  },
  iconStyle: {
    opacity: 1,
    color: "#000",
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
    left: "31%",
    backgroundColor: "#67AA52",
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
    fontWeight: "bold",
    textAlign: "center",
  },
});
