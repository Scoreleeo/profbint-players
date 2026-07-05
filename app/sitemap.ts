import type { MetadataRoute } from "next";
import { LEAGUES } from "@/lib/leagues";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://players.profbint.com";

  return [
    {
      url: baseUrl,
      changeFrequency: "daily",
      priority: 1,
    },

    ...LEAGUES.map((league) => ({
      url: `${baseUrl}/leagues/${league.id}`,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
  ];
}