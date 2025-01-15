export interface UserAdvancedResearchType {
  title: string;
  extraAdvice: string;
  optionsTitle: string;
  options: string[];
}

const recyclingData = require("@/utils/bin/materialToBinMap");
const wasteTypeOptions = Object.keys(recyclingData);

export const userAdvancedResearchAdvice: UserAdvancedResearchType[] = [
  {
    title: "De quel type de déchet s'agit-il ?",
    extraAdvice:
      "Il s’agit ici de nous aider à identifier le type du déchet : plastique, papier, métal, verre, électronique...",
    optionsTitle: "Choisir le type de déchet",
    options: wasteTypeOptions,
  },
  {
    title: "Quel est l’état de votre déchet ?",
    extraAdvice:
      "Il s’agit de nous aider à déterminer l’état de l’objet : est-il mouillé, souillé, cassé, usagé ?",
    optionsTitle: "Déterminer l'état du déchet",
    options: ["normal", "mouillé", "souillé", "cassé", "usagé"],
  },
];
