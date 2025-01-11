import { ImageSourcePropType } from "react-native";

const resources: Record<string, ImageSourcePropType> = {
  // BACKGROUND
  background_jour_de_neige: require("@/assets/images/fond_neige.png"),
  background_nuit_sous_la_neige: require("@/assets/images/fond_nuit.png"),
  background_coucher_de_soleil_enneigé: require("@/assets/images/fond_coucher.png"),
  // MONSTRE
  monster_v1: require("@/assets/images/monstre_v1.png"),
  monster_v2: require("@/assets/images/monstre_v2.png"),
  // WASTE
  canetteCoca: require("@/assets/images/canette-coca.jpg"),
};

export default resources;
