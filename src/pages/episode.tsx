import { getEpisodeDetails, EpisodeResult } from "@/api/callsApi";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const param = (context.query.number as string) || "";

  let response = null;
  if (param !== "") {
    response = await getEpisodeDetails(param);
  }

  return { props: { response } };
};

type Props = { response: EpisodeResult | null };

export default function Episode(props: Props) {
  const characters = props.response?.characters.map((character) => {
    const textArr = character.split("/");
    const number = textArr[textArr.length - 1];

    return (
      <Link key={character} href={`/details?idCharacter=${number}`}>
        <li> Character {number}</li>
      </Link>
    );
  });

  return (
    <>
      <h1 className="text-3xl text-center">EPISODE {props.response?.name}</h1>
      <main className="flex flex-col min-h-screen py-10 px-4 max-w-6xl mx-auto">
        <h3>Fecha al aire: {props.response?.air_date}</h3>
        <h3>Episode Name: {props.response?.name}</h3>
        <h3>CHARACTERS</h3>
        <ul>{characters}</ul>
      </main>
    </>
  );
}
