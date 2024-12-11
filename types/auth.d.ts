export type AuthContextType = {
  signIn: (userToken: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
};
