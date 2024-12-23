import { Routes, createRoute } from "@/types/routes";

export type TabsRoutesKeys = "SEARCH" | "HOME" | "SCAN";

export const TABS_ROUTES: Record<TabsRoutesKeys, Routes> = {
  SEARCH: createRoute("search", "Recherche", "search"),
  HOME: createRoute("index", "Accueil", "home"),
  SCAN: createRoute("scan", "Scanner", "camera"),
};
