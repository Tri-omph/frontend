import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AdminUserCard from "@/components/admin/AdminUserCard";

export default function AdminUserDetails() {
  const { id, username, points, restricted, admin } = useLocalSearchParams<{
    id: string;
    username: string;
    points: string;
    restricted: string;
    admin: string;
  }>();

  const isRestricted = restricted === "true";
  const isAdmin = admin === "true";

  return (
    <View style={styles.container}>
      <AdminUserCard
        userId={Number(id)}
        userPseudo={username}
        userPoints={Number(points)}
        restricted={isRestricted}
        admin={isAdmin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  userIdText: {
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
