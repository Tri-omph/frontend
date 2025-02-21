import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import UserStatus from "@/components/user/UserStatus";

type UserCardProps = {
  userPseudo: string;
  userPoints: number;
  restricted: boolean;
  admin: boolean;
  onPress?: () => void;
  additionalContent?: React.ReactNode;
};

const UserCard: React.FC<UserCardProps> = ({
  userPseudo,
  userPoints,
  restricted,
  admin,
  onPress,
  additionalContent,
}) => {
  return (
    <View style={[styles.playerDetails]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.detailsText}>
              <FontAwesome name="user" size={20} /> Pseudo : {userPseudo}
            </Text>
            <Text style={styles.detailsText}>
              <FontAwesome name="star" size={20} color="#FFD700" /> Points :{" "}
              {userPoints}
            </Text>
          </View>
          <View style={styles.statusContainer}>
            {additionalContent}
            <UserStatus restricted={restricted} admin={admin} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  playerDetails: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    height: 100,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "column",
    justifyContent: "center",
  },
  detailsText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10, // Ajout d'un espacement entre l'icône d'avertissement et le statut
  },
});

export default UserCard;
