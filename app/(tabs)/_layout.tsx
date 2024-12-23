import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, Redirect } from "expo-router";
import { Text } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useAuthContext } from "@/hooks/useAuthContext";
import { routes } from "@/routes/routes";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  // Utilisation, on commnece toujours par les appels aux hooks
  const isHeaderShown = useClientOnlyValue(false, true);
  const colorScheme = useColorScheme();
  const { session, isLoading } = useAuthContext();
  const TABS_ROUTES = routes.TABS;

  // Afficher un écran de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return <Text>Vérification des droits d'accès...</Text>;
  }

  console.log("Voici le token de la session actuelle: " + session);

  if (!session) {
    return <Redirect href={routes.USER.SIGN_IN.getHref()} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: isHeaderShown,
      }}
    >
      {Object.entries(TABS_ROUTES).map(([key, route]) => (
        <Tabs.Screen
          key={key}
          name={route.fileName}
          options={{
            title: route.title,
            tabBarIcon: ({ color }) => (
              <TabBarIcon
                name={
                  route.icon as React.ComponentProps<typeof FontAwesome>["name"]
                }
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
