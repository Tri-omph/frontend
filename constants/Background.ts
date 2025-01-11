import resources from "@/constants/Resources";
import { ImageSourcePropType } from "react-native";

interface BackgroundsType {
  id: string;
  image: ImageSourcePropType;
}

export const backgrounds: BackgroundsType[] = [
  {
    id: "Jour de neige",
    image: resources.background_jour_de_neige,
  },
  {
    id: "Nuit sous la neige",
    image: resources.background_nuit_sous_la_neige,
  },
  {
    id: "Coucher de soleil enneigé",
    image: resources.background_coucher_de_soleil_enneigé,
  },
];
