import React, { useRef } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import UserCard from "@/components/user/UserCard";
import { router } from "expo-router";
import { useAdminUserActions } from "@/hooks/useAdminActions";
import { FontAwesome } from "@expo/vector-icons";

type UserCardProps = {
  userId: number;
  userPseudo: string;
  userPoints: number;
  restricted: boolean;
  admin: boolean;
  hasWarnings: boolean;
  onPress?: () => void;
};

const AdminUserCard: React.FC<UserCardProps> = ({
  userId,
  userPseudo,
  userPoints,
  restricted,
  admin,
  hasWarnings,
  onPress,
}) => {
  const { promoteUser, demoteUser, restrictUser, freeUser } =
    useAdminUserActions();
  const swipeableRef = useRef<Swipeable>(null);

  const handleSwipeRight = async () => {
    if (admin) {
      Alert.alert(
        "Impossible",
        `Vous ne pouvez pas promouvoir ${userPseudo}, l'utilisateur est déjà admin`,
      );
      swipeableRef.current?.close(); // Fermer le swipeable
      return;
    }
    if (restricted) {
      Alert.alert(
        "Mettre fin à la restriction",
        `Voulez-vous mettre fin à la restriction de l'utilisateur ${userPseudo}?`,
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Oui",
            onPress: () => {
              freeUser(userId, userPseudo);
              swipeableRef.current?.close();
            },
          },
        ],
      );
      return;
    }
    Alert.alert("Promouvoir", `Voulez-vous promouvoir ${userPseudo}?`, [
      { text: "Annuler", style: "cancel" },
      {
        text: "Oui",
        onPress: () => {
          promoteUser(userId, userPseudo);
          swipeableRef.current?.close();
        },
      },
    ]);
  };

  const handleSwipeLeft = async () => {
    if (restricted) {
      Alert.alert(
        "Impossible",
        `Vous ne pouvez pas restreindre ${userPseudo}, l'utilisateur est déjà restreint`,
      );
      swipeableRef.current?.close();
      return;
    }
    if (admin) {
      Alert.alert("Rétrograder", `Voulez-vous rétrograder ${userPseudo} ?`, [
        { text: "Annuler", style: "cancel" },
        {
          text: "Oui",
          onPress: () => {
            demoteUser(userId, userPseudo);
            swipeableRef.current?.close();
          },
        },
      ]);
      return;
    } else {
      Alert.alert("Restreindre", `Voulez-vous restreindre ${userPseudo} ?`, [
        { text: "Annuler", style: "cancel" },
        {
          text: "Oui",
          onPress: () => {
            restrictUser(userId, userPseudo);
            swipeableRef.current?.close();
          },
        },
      ]);
      return;
    }
  };

  const handleUserPress = () => {
    router.push({
      pathname: `/admin-user-details/[id]`,
      params: {
        id: userId.toString(),
        username: userPseudo,
        points: userPoints.toString(),
        restricted: restricted.toString(),
        admin: admin.toString(),
        hasWarnings: hasWarnings.toString(),
      },
    });
  };

  return (
    <View>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={() => (
          <View style={styles.rightAction}>
            <Text style={styles.actionText}>Promouvoir</Text>
          </View>
        )}
        renderLeftActions={() => (
          <View style={styles.leftAction}>
            <Text style={styles.actionText}>Rétrograder</Text>
          </View>
        )}
        onSwipeableRightOpen={handleSwipeRight}
        onSwipeableLeftOpen={handleSwipeLeft}
      >
        <UserCard
          userPseudo={userPseudo}
          userPoints={userPoints}
          restricted={restricted}
          admin={admin}
          onPress={handleUserPress}
          additionalContent={
            hasWarnings && (
              <FontAwesome
                name="exclamation-triangle"
                size={20}
                color="orange"
              />
            )
          }
        />
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#dd2150",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    height: 100,
  },
  rightAction: {
    flex: 1,
    backgroundColor: "#15c573",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 20,
    borderRadius: 10,
    height: 100,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default AdminUserCard;
