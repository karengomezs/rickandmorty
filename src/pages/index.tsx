import { useState } from "react";
import Link from "next/link";
import { getFigures } from "@/api/callsApi";
import { RootObject } from "@/api/callsApi";
import { Button, buttonVariants } from "@/components/ui/button";

export const getServerSideProps = async () => {
  type UrlsT = string;
  const BaseUrl: UrlsT = "https://rickandmortyapi.com/api/character";
  const response = await getFigures(BaseUrl);
  return { props: { response } };
};

type PropsT = { response?: RootObject };

export default function Home(props: PropsT) {
  const [charactersData, setCharactersData] = useState<
    RootObject["results"] | undefined
  >(props.response?.results);

  const [nextPage, setNextPage] = useState<string | undefined>(
    props.response?.info?.next
  );

  const [prevPage, setPrevPage] = useState<string | null>(
    props.response?.info?.prev
  );

  const characters = charactersData?.map((character) => {
    return (
      <Link key={character.id} href={`/details?idCharacter=${character.id}`}>
        <div>
          <img src={character.image} className="h-3/4" alt="" />
          <p>{character.name}</p>
        </div>
      </Link>
    );
  });

  return (
    <>
      <h1 className="text-3xl text-center">RICK AND MORTY</h1>
      <main className="flex flex-col min-h-screen py-10 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-4 gap-4">{characters}</div>

        <Button variant="default">karen</Button>

        <button
          className="bg-amber-600 w-1/5 mb-6"
          onClick={async () => {
            if (prevPage) {
              const response = await getFigures(prevPage);
              setCharactersData(response?.results);
              setNextPage(response?.info.next);
              setPrevPage(response?.info.prev);
            }
          }}
        >
          Prev Page
        </button>
        <button
          className="bg-amber-600 w-1/5"
          onClick={async () => {
            if (nextPage) {
              const response = await getFigures(nextPage);
              setCharactersData(response?.results);
              setNextPage(response?.info.next);
              setPrevPage(response?.info.prev);
            }
          }}
        >
          Next Page
        </button>
      </main>
    </>
  );
}
