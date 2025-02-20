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
];
