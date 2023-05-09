import { getSingleCharacter, Result } from "@/api/callsApi";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const param = (context.query.idCharacter as string) || ""; //porque yo puedo ir a la url sin parámetro y el atributo no va a existir,
  //   //para que no sea null o undefined, coloco la opción de que por defecto puede ser un string vacío;

  let response = null;

  if (param !== "") {
    response = await getSingleCharacter(param);
  }

  return { props: { response } };
};

type Props = {
  response: Result | null;
};

function extractedNumber(text: string | undefined): string | undefined {
  const textArr = text?.split("/");
  const number = textArr?.[textArr.length - 1];
  return number;
}

export default function CharacterDetails(props: Props) {
  const episodes = props.response?.episode.map((episode, i) => {
    return (
      <Link key={i} href={`/episode?number=${extractedNumber(episode)}`}>
        <li>Episode {extractedNumber(episode)}</li>
      </Link>
    );
  });

  return (
    <>
      <h1 className="text-3xl text-center">CHARACTER</h1>
      <main className="flex flex-col min-h-screen py-10 px-4 max-w-6xl mx-auto">
        <img className="w-1/3" src={props.response?.image} alt="" />
        <h3>Gender: {props.response?.gender}</h3>
        <h3>Name: {props.response?.name}</h3>
        <h3>Especie: {props.response?.species}</h3>
        <Link
          href={`locationDetails?number=${extractedNumber(
            props.response?.location.url
          )}`}
        >
          <h3>Location: {props.response?.location.name}</h3>
        </Link>
        <h3>EPISODES</h3>
        <ul>{episodes}</ul>
      </main>
    </>
  );
}
