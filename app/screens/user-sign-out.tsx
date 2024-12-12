import { Text, View } from "react-native";

import { useAuthContext } from "@/hooks/useAuthContext";

export default function Index() {
  const { signOut } = useAuthContext();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          // The `app/(tab)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
