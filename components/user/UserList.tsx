import React from "react";
import { View, FlatList, StyleSheet, RefreshControl, Text } from "react-native";

interface User {
  id: number;
  username: string;
  points: number;
  restricted: boolean;
  admin: boolean;
}

interface UserListProps {
  users: User[];
  onRefresh: () => void;
  refreshing: boolean;
  renderItem: ({ item, index }: { item: User; index: number }) => JSX.Element;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onRefresh,
  refreshing,
  renderItem,
}) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item, index) =>
        item.id !== undefined ? item.id.toString() : index.toString()
      }
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#6AA84F"]}
          progressBackgroundColor={"#F5F5F5"}
        />
      }
      ListEmptyComponent={
        <Text style={styles.noUsersText}>Aucun utilisateur trouvé.</Text>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  noUsersText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
});

export default UserList;
