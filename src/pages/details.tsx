import { getDetails, Result } from "@/api/callsApi";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const param = (context.query.idCharacter as string) || ""; //porque yo puedo ir a la url sin parámetro y el atributo no va a existir,
  //   //para que no sea null o undefined, coloco la opción de que por defecto puede ser un string vacío;

  let response = null;

  if (param !== "") {
    response = await getDetails(param);
  }

  return { props: { response } };
};

type Props = {
  response: Result | null;
};

export default function CharacterDetails(props: Props) {
  const episodes = props.response?.episode.map((episode, i) => {
    const textArr = episode.split("/");
    const number = textArr[textArr.length - 1];

    return (
      <Link key={i} href={`/episode?number=${number}`}>
        <li>Episode {number}</li>
      </Link>
    );
  });
  return (
    <>
      <h1 className="text-3xl text-center">DETAILS</h1>
      <main className="flex flex-col min-h-screen py-10 px-4 max-w-6xl mx-auto">
        <img className="w-1/3" src={props.response?.image} alt="" />
        <h3>{props.response?.gender}</h3>
        <h3>{props.response?.name}</h3>
        <h3>{props.response?.location.name}</h3>
        <h3>{props.response?.species}</h3>
        <h3>EPISODES</h3>
        <ul>{episodes}</ul>
      </main>
    </>
  );
}
