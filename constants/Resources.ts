import { ImageSourcePropType } from "react-native";

const resources: Record<string, ImageSourcePropType> = {
  // BACKGROUND
  background_jour_de_neige: require("@/assets/images/fond_neige.png"),
  background_nuit_sous_la_neige: require("@/assets/images/fond_nuit.png"),
  background_coucher_de_soleil_enneigé: require("@/assets/images/fond_coucher.png"),
  // MONSTRE
  monster_v1: require("@/assets/images/monstre_v1.png"),
  monster_v2: require("@/assets/images/monstre_v2.png"),
  monster_v3: require("@/assets/images/monstre_v3.png"), // Ici, le monstre avec la fleur (niv 2, TODO: Revenir sur la gestion des ressources)

  // WASTE
  canetteCoca: require("@/assets/images/canette-coca.jpg"),
  // BIN
  blueBin: require("@/assets/images/bin/blue-bin.jpg"),
  greenBin: require("@/assets/images/bin/green-bin.jpg"),
  greyBin: require("@/assets/images/bin/grey-bin.jpg"),
  yellowBin: require("@/assets/images/bin/yellow-bin.jpg"),
};

export default resources;
