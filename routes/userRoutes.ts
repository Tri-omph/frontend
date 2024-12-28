import { Routes, createRoute } from "@/types/routes";

type UserRoutesKeys = "SIGN_IN" | "SIGN_UP" | "SETTINGS" | "POLITIQUE";

export const USER_ROUTES: Record<UserRoutesKeys, Routes> = {
  SIGN_IN: createRoute("user-sign-in"),
  SIGN_UP: createRoute("user-sign-up"),
  SETTINGS: createRoute("user-settings-menu"),
  POLITIQUE: createRoute("user-politique-donnees"),
};
