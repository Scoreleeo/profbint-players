import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://players.profbint.com"),

  title: {
    default: "Pro Football Intel Players | Professional Football Player Database",
    template: "%s | Pro Football Intel Players",
  },

  description:
    "Explore professional football players, clubs and squads across Europe's leading leagues. Browse live player profiles, team squads and football intelligence powered by Pro Football Intel.",

  keywords: [
    "football players",
    "soccer players",
    "player database",
    "football database",
    "Premier League players",
    "La Liga players",
    "Serie A players",
    "Bundesliga players",
    "Ligue 1 players",
    "Eredivisie players",
    "Primeira Liga players",
    "football squads",
    "Pro Football Intel",
  ],

  applicationName: "Pro Football Intel Players",

  authors: [
    {
      name: "Pro Football Intel",
    },
  ],

  creator: "Pro Football Intel",

  publisher: "Pro Football Intel",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://players.profbint.com",
    siteName: "Pro Football Intel Players",
    title: "Pro Football Intel Players",
    description:
      "Professional football player database featuring live squads, player profiles and club information across Europe's leading leagues.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pro Football Intel Players",
    description:
      "Professional football player database with live squads and player profiles.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}