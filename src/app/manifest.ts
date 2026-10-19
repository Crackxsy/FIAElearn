import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FIAElearn – AP1 & AP2 für Fachinformatiker AE",
    short_name: "FIAElearn",
    description: "Lernplan, Übungen und Prüfungssimulation für die IHK-Abschlussprüfung Fachinformatiker/in Anwendungsentwicklung.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#f5f5f7",
    theme_color: "#1d1d1f",
    lang: "de",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
