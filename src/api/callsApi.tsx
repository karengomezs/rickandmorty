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

interface CommonType {
  id: number;
  name: string;
  url: string;
  created: string;
}

export interface EpisodeResult extends CommonType {
  air_date: string;
  episode: string;
  characters: string[];
}

export interface LocationResult extends CommonType {
  type: string;
  dimension: string;
  residents: string[];
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

export async function getDetailsLocation(number: string) {
  try {
    const url: UrlsT = `https://rickandmortyapi.com/api/location/${number}`;
    const response = await fetch(url);
    const data: LocationResult = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
