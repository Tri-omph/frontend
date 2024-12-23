import { Href } from "expo-router";

// Type des routes
export type Routes = {
  fileName: string;
  title?: string;
  icon?: string;
  getHref: () => Href;
};

export const createRoute = (
  fileName: string,
  title?: string,
  icon?: string,
): Routes => ({
  fileName,
  getHref: () => `/${fileName}` as Href,
  title,
  icon,
});
