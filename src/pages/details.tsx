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
        <li>
          <b className="underline">Episode {extractedNumber(episode)}</b> 🔗
        </li>
      </Link>
    );
  });

  return (
    <>
      <h1
        className={`rick-morty-font text-7xl text-center my-4 text-cyan-500 `}
      >
        CHARACTER
      </h1>
      <main className="flex flex-col items-center min-h-screen py-5 max-w-[300px] mx-auto">
        <div className="border ">
          <img src={props.response?.image} alt="" />
          <div className=" text-white px-3 py-3 text-xl">
            <h3>
              <span className="text-cyan-300">Name: </span>
              <b>{props.response?.name}</b>
            </h3>
            <h3>
              <span className="text-cyan-300">Gender: </span>
              <b>{props.response?.gender}</b>
            </h3>

            <h3>
              <span className="text-cyan-300">Specie: </span>
              <b>{props.response?.species}</b>
            </h3>

            <Link
              href={`locationDetails?number=${extractedNumber(
                props.response?.location.url
              )}`}
            >
              <h3>
                <span className="text-cyan-300">Location: </span>
                <b>{props.response?.location.name}</b>
              </h3>
            </Link>
            <h3>
              <span className="text-cyan-300">Episodes:</span>
            </h3>
            <ul>{episodes}</ul>
          </div>
        </div>
      </main>
    </>
  );
}
