import { useAuthContext } from "@/hooks/useAuthContext";
import UserManager from "@/services/managers/userManager";

export function useSession() {
  // Ce hook gère les connexion et déconnexion et surtout, il cache la complexité liée à la gestion du token !
  // Se pose tout de meme la question de où l'on catch l'erreur, ici ou dans le composants ...
  const { signIn, signOut } = useAuthContext();

  const createNewUser = async (body: {
    username: string;
    password: string;
    email: string;
  }) => {
    try {
      const res = await UserManager.CREATE_USER(body);
      // TODO: A l'avenir le résultat de la requete doit renvoyer un token, voir avec la team backend ! => Editer le code suivant:
      /*
      if (!res.token) {
        throw new Error("Le token est absent !");
      }
      signIn(res.token);
      */
      signIn("tokenDuBack");
      return res;
    } catch (error) {
      throw error;
    }
  };

  const authenticateUser = async (body: {
    username: string;
    password: string;
  }) => {
    try {
      const res = await UserManager.AUTH_USER(body);
      // TODO: A l'avenir le résultat de la requete doit renvoyer un token, voir avec la team backend ! => Editer le code suivant:
      /*
      if (!res.token) {
        throw new Error("Le token est absent !");
      }
      signIn(res.token);
      */
      signIn("tokenDuBack");
      return res;
    } catch (error) {
      throw error; // Propagation de l'erreur pour gestion au niveau du composant
    }
  };

  const disconnectUser = async () => {
    signOut();
  };

  return { createNewUser, authenticateUser, disconnectUser };
}
