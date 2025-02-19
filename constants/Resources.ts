import { ImageSourcePropType } from "react-native";

const resources: Record<string, ImageSourcePropType> = {
  // ************** BACKGROUND
  background_jour_de_neige: require("@/assets/images/fond_neige.png"),
  background_nuit_sous_la_neige: require("@/assets/images/fond_nuit.png"),
  background_coucher_de_soleil_enneigé: require("@/assets/images/fond_coucher.png"),

  // ************** MONSTRE (disponible en deux fois, la version classique et la version qui ferme les yeux !)
  // niv1
  monster_v1: require("@/assets/images/monstre_v1.png"),
  monster_v1_closed: require("@/assets/images/monstre_v1_closed.png"),
  // niv2
  monster_v2: require("@/assets/images/monstre_v2.png"),
  monster_v2_closed: require("@/assets/images/monstre_v2_closed.png"),
  // niv3
  monster_v3: require("@/assets/images/monstre_v3.png"),
  monster_v3_closed: require("@/assets/images/monstre_v3_closed.png"),

  // ************** WASTE
  canetteCoca: require("@/assets/images/canette-coca.jpg"),

  // ************** BIN
  blueBin: require("@/assets/images/bin/blue-bin.jpg"),
  greenBin: require("@/assets/images/bin/green-bin.jpg"),
  greyBin: require("@/assets/images/bin/grey-bin.jpg"),
  yellowBin: require("@/assets/images/bin/yellow-bin.jpg"),
};

export default resources;
