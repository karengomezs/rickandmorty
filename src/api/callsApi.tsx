export interface RootObject {
  info: Info;
  results: Result[];
}

interface Result {
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

type UrlsT = string;
// const BaseUrl: UrlsT = "https://rickandmortyapi.com/api/character";

export async function getFigures(BaseUrl: UrlsT) {
  try {
    const response = await fetch(BaseUrl);
    const data: RootObject = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
