import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import ScanResultScreen from "@/app/screens/scan/scan-result"; // Assurez-vous que le chemin est correct

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <ScanResultScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
