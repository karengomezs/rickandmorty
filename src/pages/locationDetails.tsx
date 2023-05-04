import {
  getDetailsLocation,
  LocationResult,
  getMultipleCharacters,
  Result,
} from "@/api/callsApi";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import Slider from "../../components/Slider";

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
  // const residents = props.characters?.map((character) => {
  //   return (
  //     <Link key={character.id} href={`/details?idCharacter=${character.id}`}>
  //       <img className="w-3/5" src={character.image} alt="" />
  //     </Link>
  //   );
  // });

  const residents = props.characters?.map((character) => {
    return {
      src: character.image,
      href: `/details?idCharacter=${character.id}`,
    };
  });

  return (
    <>
      <h1 className="text-3xl text-center">DETAILS LOCATION</h1>
      <main className="flex flex-col min-h-screen py-10 px-4 max-w-6xl mx-auto">
        <h3>Name: {props.response?.name}</h3>
        <h3>Type: {props.response?.type}</h3>
        <h3>Dimension: {props.response?.dimension}</h3>
        <h3>RESIDENTS</h3>
        <Slider imagenes={residents} />
      </main>
    </>
  );
}
