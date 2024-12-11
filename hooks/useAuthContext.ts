import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export function useAuthContext() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}
