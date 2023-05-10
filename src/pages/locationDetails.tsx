import {
  getDetailsLocation,
  LocationResult,
  getMultipleCharacters,
  Result,
} from "@/api/callsApi";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import Slider from "../components/Slider";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const params = (context.query.number as string) || "";

  let response = null;

  if (params !== "") {
    response = await getDetailsLocation(params);
  }

  const charactersIds = response?.residents.map((character) => {
    const textArr = character.split("/");
    const number = textArr[textArr.length - 1];
    return number;
  });

  const stringCharactersIds = charactersIds?.join();

  let characters = null;
  if (stringCharactersIds) {
    characters = await getMultipleCharacters(stringCharactersIds);
  }

  return { props: { response, characters } };
};

type Props = { response: LocationResult | null; characters: Result[] | null };

export default function LocationDetails(props: Props) {
  const residents = props.characters?.map((character) => {
    return {
      src: character.image,
      href: `/details?idCharacter=${character.id}`,
    };
  });

  return (
    <div className="h-screen flex flex-col">
      <h1
        className={`rick-morty-font text-7xl text-center my-4 text-cyan-500 `}
      >
        {props.response?.name}
      </h1>
      <main className="flex flex-col flex-1 items-center max-w-6xl mx-auto">
        <h3 className="text-xl mt-10">
          <span className="text-cyan-300">Dimension: </span>
          <b className="text-white">{props.response?.dimension}</b>
        </h3>
        <h3 className="text-xl">
          <span className="text-cyan-300">Type: </span>
          <b className="text-white">{props.response?.type}</b>
        </h3>
        <h3 className="text-cyan-300 text-xl mb-20">
          <b>RESIDENTS</b>
        </h3>

        <Slider mount={3} imagenes={residents} />
      </main>
    </div>
  );
}
