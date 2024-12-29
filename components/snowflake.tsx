import React, { useRef, useEffect, useState } from "react";
import { Animated, StyleSheet, Easing } from "react-native";

const styles = StyleSheet.create({
  snowflake: {
    color: "white",
    position: "absolute",
  },
});

const START_Y_POSITION = -340;
const FALL_SPEEDS = ["slow", "medium", "fast"] as const;
function getFallSpeed(speed: (typeof FALL_SPEEDS)[number]) {
  if (FALL_SPEEDS.includes(speed)) {
    return speed;
  } else {
    return "medium";
  }
}
const currentSpeed = getFallSpeed("medium");
console.log(currentSpeed);

const FALL_DURATIONS: Record<(typeof FALL_SPEEDS)[number], [number, number]> = {
  fast: [8000, 15000],
  medium: [15000, 30000],
  slow: [30000, 60000],
};
const SNOWFLAKE_TYPES = ["❄", "❅", "❆"];

interface SnowflakeProps {
  scene: { width: number; height: number };
  fallSpeed?: (typeof FALL_SPEEDS)[number];
  snowflakesCount?: number;
}

export default function Snowflake({
  scene,
  fallSpeed = "medium",
}: SnowflakeProps) {
  const [config, setConfig] = useState(() =>
    getConfig({ scene, fallSpeed, initialDelay: true }),
  );
  const animatedY = useRef(new Animated.Value(START_Y_POSITION)).current;
  const animatedRotation = useRef(new Animated.Value(0)).current;
  const animatedSideMovement = useRef(new Animated.Value(0)).current;

  const runAnimation = () => {
    animatedY.setValue(START_Y_POSITION);
    animatedRotation.setValue(0);
    animatedSideMovement.setValue(0);

    Animated.loop(
      Animated.timing(animatedRotation, {
        toValue: 1,
        duration: config.rotationDuration,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedSideMovement, {
          toValue: -1,
          duration: config.sideMovementDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedSideMovement, {
          toValue: 1,
          duration: config.sideMovementDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.sequence([
      Animated.delay(config.fallDelay),
      Animated.timing(animatedY, {
        toValue: scene.height,
        duration: config.fallDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setConfig(getConfig({ scene, fallSpeed }));
    });
  };

  useEffect(() => {
    runAnimation();
  }, [config]);

  const rotate = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: config.rotationDirection
      ? ["0deg", "360deg"]
      : ["360deg", "0deg"],
  });

  const translateX = animatedSideMovement.interpolate({
    inputRange: [-1, 1],
    outputRange: [-config.sideMovementAmplitude, config.sideMovementAmplitude],
  });

  return (
    <Animated.Text
      style={[
        styles.snowflake,
        {
          transform: [{ translateY: animatedY }, { rotate }, { translateX }],
          left: config.xPosition,
          fontSize: config.size,
          opacity: config.opacity,
        },
      ]}
    >
      {config.type}
    </Animated.Text>
  );
}

function getConfig({
  scene,
  fallSpeed = "medium",
  initialDelay = false,
}: {
  scene: { width: number; height: number };
  fallSpeed?: (typeof FALL_SPEEDS)[number];
  initialDelay?: boolean;
}) {
  const { width } = scene;

  const size = randomInt(10, 18);
  const opacity = randomInt(4, 10) / 10;
  const type = SNOWFLAKE_TYPES[randomInt(0, 2)];
  const xPosition = randomInt(0, width);

  const fallDuration = randomInt(...FALL_DURATIONS[fallSpeed]);
  const fallDelay = randomInt(500, initialDelay ? 20000 : 10000);
  const rotationDuration = randomInt(2000, 10000);
  const rotationDirection = randomInt(0, 1) === 1;
  const sideMovementDuration = randomInt(3000, 8000);
  const sideMovementAmplitude = randomInt(0, 50);

  return {
    size,
    opacity,
    type,
    xPosition,
    fallDuration,
    fallDelay,
    rotationDuration,
    rotationDirection,
    sideMovementDuration,
    sideMovementAmplitude,
  };
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
