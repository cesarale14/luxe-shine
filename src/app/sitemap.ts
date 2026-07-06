import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const routes = ["", "/residential", "/str-turnovers", "/quote", "/standard"];
  return routes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route === "/quote" ? 0.9 : 0.8,
  }));
}
