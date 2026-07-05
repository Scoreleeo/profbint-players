export type League = {
  id: number;
  name: string;
  country: string;
  slug: string;
  emoji: string;
  logo?: string;
};

export type Team = {
  id: number;
  name: string;
  logo: string;
  country?: string;
  founded?: number | null;
  venueName?: string | null;
  venueCity?: string | null;
};

export type Player = {
  id: number;
  name: string;
  age?: number | null;
  number?: number | null;
  position?: string | null;
  photo?: string | null;
};

export type PlayerProfile = {
  id: number;
  name: string;
  firstname?: string | null;
  lastname?: string | null;
  age?: number | null;
  birthDate?: string | null;
  nationality?: string | null;
  height?: string | null;
  weight?: string | null;
  injured?: boolean | null;
  photo?: string | null;
  teamName?: string | null;
  teamLogo?: string | null;
  leagueName?: string | null;
  position?: string | null;
  appearances?: number | null;
  goals?: number | null;
  assists?: number | null;
  minutes?: number | null;
  yellowCards?: number | null;
  redCards?: number | null;
};

export type PlayerSearchResult = {
  id: number;
  name: string;
  teamName: string;
  teamLogo?: string | null;
  leagueName?: string | null;
  position?: string | null;
  photo?: string | null;
};