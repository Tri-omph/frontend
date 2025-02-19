import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import AdminUserCard from "@/components/admin/AdminUserCard";
import { useAdminUserActions } from "@/hooks/useAdminActions";
import SearchBar from "@/components/filters/SearchBar";
import AdminFilterOnUsers from "@/components/admin/AdminFilterOnUsers";
import UserList from "@/components/user/UserList";

const AdminScreenSearch = () => {
  const {
    users,
    filterUsers,
    fetchUsers,
    loading,
    searchQuery,
    handleSearchQuery,
    applyFilter,
  } = useAdminUserActions();
  const [refreshing, setRefreshing] = useState(false);
  const [isFilterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

  const handleOpenFilter = () => {
    setFilterVisible(true);
  };

  const handleCloseFilter = () => {
    setFilterVisible(false);
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
        <View>
          <SearchBar
            placeholder="Indiquer le pseudo"
            value={searchQuery}
            onChangeText={(query: string) => handleSearchQuery(query)}
            onClickOnFilterIcon={handleOpenFilter}
          />
          <UserList
            users={filterUsers}
            onRefresh={onRefresh}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <AdminUserCard
                userId={item.id}
                userPseudo={item.username}
                userPoints={item.points}
                restricted={item.restricted}
                admin={item.admin}
              />
            )}
          />
        </View>
      )}
      <Toast />

      {/* Filtre administrateurs, il apparait dans un bottom sheet */}
      <AdminFilterOnUsers
        isVisible={isFilterVisible}
        onClose={handleCloseFilter}
        applyFilter={applyFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
});

export default AdminScreenSearch;
