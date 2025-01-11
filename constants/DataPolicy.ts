export interface DataPolicyType {
  id: number;
  title: string;
  description: string;
}

export const dataPolicy: DataPolicyType[] = [
  {
    id: 1,
    title: "Permettre à l’application de conserver vos photos",
    description:
      "Vos photos apparaîtront dans votre historique de scans. Elles seront visibles par vous et par l’administrateur.",
  },
  {
    id: 2,
    title: "Permettre à l’IA de s’entraîner grâce à vos retours",
    description:
      "Si vous êtes en mode “recherche avancée” alors l’IA n’a pas su répondre à vos attentes, nous pourrons l’améliorer grâce à vos retours.",
  },
  {
    id: 3,
    title: "Permettre à l’application de vous localiser",
    description:
      "Votre localisation permet à l’application de déterminer les zones de tri et les poubelles disponibles autour de vous ! L’application ne stocke pas votre localisation !",
  },
];
