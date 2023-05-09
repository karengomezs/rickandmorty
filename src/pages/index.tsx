import { useState } from "react";
import Link from "next/link";
import { getFigures } from "@/api/callsApi";
import { RootObject } from "@/api/callsApi";
import { Button } from "@/components/ui/button";

import { myFont } from "@/styles/font";

export const getServerSideProps = async () => {
  type UrlsT = string;
  const BaseUrl: UrlsT = "https://rickandmortyapi.com/api/character";
  const response = await getFigures(BaseUrl);
  return { props: { response } };
};

type PropsT = { response?: RootObject };

export default function Home(props: PropsT) {
  console.log(myFont);

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
      <Link
        className="group"
        key={character.id}
        href={`/details?idCharacter=${character.id}`}
      >
        <div className="w-full h-full relative">
          <img src={character.image} alt="" />
          <div className="absolute bottom-0 bg-black opacity-25 group-hover:opacity-100 text-white w-full h-10 flex justify-center items-center">
            <p className="text-xl">{character.name}</p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <>
      <h1
        className={`rick-morty-font text-7xl text-center my-4 text-cyan-500 `}
      >
        RICK AND MORTY
      </h1>

      <main className="flex flex-col min-h-screen max-w-4xl mx-auto ">
        <div className="grid grid-cols-5 gap-1 w-full">{characters}</div>

        <div className="flex gap-4 pt-10 mx-auto">
          {prevPage && (
            <Button
              size="lg"
              variant="default"
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
            </Button>
          )}

          <Button
            size="lg"
            variant="default"
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
          </Button>
        </div>

        {/* <button
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
        </button> */}
        {/* <button
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
        </button> */}
      </main>
    </>
  );
}
