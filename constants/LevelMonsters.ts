import resources from "@/constants/Resources";
import { ImageSourcePropType } from "react-native";

interface LevelMonsterType {
  level: number;
  image: ImageSourcePropType;
}

export const levelMonsters: LevelMonsterType[] = [
  {
    level: 0,
    image: resources.monster_v1,
  },
  {
    level: 1,
    image: resources.monster_v2,
  },
  {
    level: 2,
    image: resources.monster_v3,
  },
];
