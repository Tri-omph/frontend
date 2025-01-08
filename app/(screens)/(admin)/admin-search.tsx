import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Toast from "react-native-toast-message";
import AdminUserCard from "@/components/admin/AdminUserCard";
import { useAdminUserActions } from "@/hooks/useAdminActions";

const UserListScreen = () => {
  const { users, fetchUsers, loading } = useAdminUserActions();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6AA84F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {users.length === 0 ? (
        <Text style={styles.noUsersText}>Aucun utilisateur trouvé.</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AdminUserCard
              userId={item.id}
              userPseudo={item.username}
              userPoints={item.points}
              restricted={item.restricted}
              admin={item.admin}
            />
          )}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#6AA84F"]}
              progressBackgroundColor={"#F5F5F5"}
            />
          }
        />
      )}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noUsersText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default UserListScreen;
