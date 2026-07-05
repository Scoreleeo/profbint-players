"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import SearchInput from "@/components/ui/SearchInput";

type SearchPlayer = {
  id: number;
  name: string;
  teamName: string;
  teamLogo?: string | null;
  leagueName?: string | null;
  position?: string | null;
  photo?: string | null;
  searchText: string;
};

type GlobalPlayerSearchProps = {
  mobile?: boolean;
};

export default function GlobalPlayerSearch({
  mobile = false,
}: GlobalPlayerSearchProps) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [players, setPlayers] = useState<SearchPlayer[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch("/data/player-search.json")
      .then((response) => response.json())
      .then((data) => setPlayers(Array.isArray(data) ? data : []))
      .catch(() => setPlayers([]))
      .finally(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (value.length < 2) return [];

    return players
      .filter((player) => player.searchText.includes(value))
      .slice(0, 6);
  }, [players, query]);

  function openPlayer(player: SearchPlayer) {
    setQuery("");
    setIsOpen(false);
    router.push(`/players/${player.id}`);
  }

  return (
    <div
      ref={wrapperRef}
      className={
        mobile
          ? "relative block w-full lg:hidden"
          : "relative hidden w-full max-w-sm lg:block"
      }
    >
      <SearchInput
        value={query}
        placeholder="Search players..."
        onFocus={() => setIsOpen(true)}
        onChange={(value) => {
          setQuery(value);
          setIsOpen(true);
          setActiveIndex(0);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsOpen(false);
          }

          if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((index) =>
              results.length ? Math.min(index + 1, results.length - 1) : 0
            );
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((index) => Math.max(index - 1, 0));
          }

          if (event.key === "Enter" && results[activeIndex]) {
            event.preventDefault();
            openPlayer(results[activeIndex]);
          }
        }}
      />

      {isOpen && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/40">
          {!isLoaded ? (
            <div className="p-4 text-sm text-slate-400">
              Loading player database...
            </div>
          ) : results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto p-2">
              {results.map((player, index) => (
                <Link
                  key={player.id}
                  href={`/players/${player.id}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    setQuery("");
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 transition ${
                    index === activeIndex
                      ? "bg-yellow-400/10"
                      : "hover:bg-slate-900"
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1">
                    {player.photo ? (
                      <img
                        src={player.photo}
                        alt={player.name}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    ) : (
                      <span>👤</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">
                      {player.name}
                    </p>

                    <p className="truncate text-xs text-slate-400">
                      {player.teamName}
                      {player.position ? ` · ${player.position}` : ""}
                    </p>
                  </div>

                  {player.teamLogo && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white p-1">
                      <img
                        src={player.teamLogo}
                        alt={`${player.teamName} badge`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-slate-400">No players found.</div>
          )}
        </div>
      )}
    </div>
  );
}