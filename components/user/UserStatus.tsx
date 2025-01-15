import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserStatusEnum } from "@/types/userEnums";

type UserStatusProps = {
  restricted: boolean;
  admin: boolean;
};

const getStatus = (restricted: boolean, admin: boolean) => {
  if (admin) return UserStatusEnum.ADMIN;
  if (restricted) return UserStatusEnum.RESTREINT;
  return UserStatusEnum.SIMPLE;
};

const UserStatus: React.FC<UserStatusProps> = ({ restricted, admin }) => {
  // Définir les styles en fonction du statut
  const getStatusStyles = () => {
    switch (getStatus(restricted, admin)) {
      case UserStatusEnum.RESTREINT:
        return {
          backgroundColor: "#FDECEA",
          circleColor: "red",
          text: UserStatusEnum.RESTREINT,
          textColor: "red",
        };
      case UserStatusEnum.SIMPLE:
        return {
          backgroundColor: "#E7F3FE",
          circleColor: "blue",
          text: UserStatusEnum.SIMPLE,
          textColor: "blue",
        };
      case UserStatusEnum.ADMIN:
        return {
          backgroundColor: "#E9F7EF",
          circleColor: "green",
          text: UserStatusEnum.ADMIN,
          textColor: "green",
        };
      default:
        return {
          backgroundColor: "#F5F5F5",
          circleColor: "gray",
          textColor: "gray",
        };
    }
  };

  const { backgroundColor, circleColor, text, textColor } = getStatusStyles();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.circle, { backgroundColor: circleColor }]} />
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    marginLeft: 10,
  },
});

export default UserStatus;
