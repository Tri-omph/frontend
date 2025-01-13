import resources from "@/constants/Resources";
import { ImageSourcePropType } from "react-native";

const materialToBinMap = require("@/utils/bin/materialToBinMap");

type BinInfo = { nameOfBin: string; imageOfBin: ImageSourcePropType };

const binToThrowIn: Record<string, BinInfo> = {
  blueBin: { nameOfBin: "bleue", imageOfBin: resources.blueBin },
  greenBin: { nameOfBin: "verte", imageOfBin: resources.greenBin },
  greyBin: { nameOfBin: "grise", imageOfBin: resources.greyBin },
  yellowBin: { nameOfBin: "jaune", imageOfBin: resources.yellowBin },
};

const getBinToThrowIn = (material: string): BinInfo => {
  const binKey = materialToBinMap[material] || "greyBin"; // Si non trouvé, mettre la poubelle grise par défaut
  return binToThrowIn[binKey];
};

export default getBinToThrowIn;
