import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FeaturedPlayer from "@/components/home/FeaturedPlayer";
import Hero from "@/components/home/Hero";
import LeagueGrid from "@/components/home/LeagueGrid";

export const metadata: Metadata = {
  title: "Professional Football Player Database",
  description:
    "Explore football players, clubs and live squads across Europe's leading leagues with Pro Football Intel Players.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pro Football Intel Players",
    description:
      "Browse professional football player profiles, clubs and squads across Europe's leading leagues.",
    url: "/",
  },
  twitter: {
    title: "Pro Football Intel Players",
    description:
      "Browse professional football player profiles, clubs and squads across Europe's leading leagues.",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <Header />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="space-y-10 pb-14 pt-6 sm:space-y-12 sm:pb-16 sm:pt-8 lg:space-y-14">
          <Hero />
          <FeaturedPlayer />
          <LeagueGrid />
        </div>
      </div>

      <Footer />
    </main>
  );
}