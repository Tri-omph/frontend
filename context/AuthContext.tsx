import { createContext, type PropsWithChildren } from "react";
import { AuthContextType } from "@/types/auth";
import { useStorageState } from "@/hooks/useStorageState";
import ApiClient from "@/services/ApiClient";

const AuthContext = createContext<AuthContextType>({
  signIn: (userToken: string) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: (userToken: string) => {
          ApiClient.setToken(userToken);
          setSession(userToken);
        },
        signOut: () => {
          ApiClient.setToken(null);
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
