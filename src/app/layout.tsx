import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-mono-geist", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL ?? "http://localhost:3000"),
  title: { default: "FIAElearn – AP1 & AP2 für Fachinformatiker AE", template: "%s · FIAElearn" },
  description:
    "Lernapp für die Abschlussprüfung Fachinformatiker/in Anwendungsentwicklung (AP1 & AP2, SIHK Hagen/NRW): persönlicher Lernplan, Zielnote, Einstufungstest, Rettungsmodus, Karteikarten, SQL-Übungen und Prüfungssimulation.",
  applicationName: "FIAElearn",
  openGraph: {
    title: "FIAElearn – AP1 & AP2 für Fachinformatiker AE",
    description: "Strukturiert lernen. Verstehen. Bestehen.",
    images: ["/brand/banner.png"],
    locale: "de_DE",
    type: "website",
  },
  appleWebApp: { capable: true, title: "FIAElearn", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-dvh">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
