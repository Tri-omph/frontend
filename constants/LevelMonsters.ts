import resources from "@/constants/Resources";
import { ImageSourcePropType } from "react-native";

interface LevelMonsterType {
  level: number;
  image: ImageSourcePropType;
  image_closed: ImageSourcePropType;
}

export const levelMonsters: LevelMonsterType[] = [
  {
    level: 1,
    image: resources.monster_v1,
    image_closed: resources.monster_v1_closed,
  },
  {
    level: 2,
    image: resources.monster_v2,
    image_closed: resources.monster_v2_closed,
  },
  {
    level: 3,
    image: resources.monster_v3,
    image_closed: resources.monster_v3_closed,
  },
];
