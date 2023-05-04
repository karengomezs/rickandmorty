import { data } from "autoprefixer";

export interface RootObject {
  info: Info;
  results: Result[];
}

export interface Result {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Origin;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Origin {
  name: string;
  url: string;
}

interface Info {
  count: number;
  pages: number;
  next: string;
  prev?: any;
}

export interface EpisodeResult {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

type UrlsT = string;

export async function getFigures(BaseUrl: UrlsT) {
  try {
    const response = await fetch(BaseUrl);
    const data: RootObject = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getDetails(id: string) {
  try {
    const url: UrlsT = `https://rickandmortyapi.com/api/character/${id}`;
    const response = await fetch(url);
    const data: Result = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getEpisodeDetails(number: string) {
  try {
    const url: UrlsT = `https://rickandmortyapi.com/api/episode/${number}`;
    const response = await fetch(url);
    const data: EpisodeResult = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
