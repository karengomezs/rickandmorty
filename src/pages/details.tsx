import { getSingleCharacter, Result } from "@/api/callsApi";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import H1 from "@/components/H1";
import H3Span from "@/components/H3";

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
      <H1 title="CHARACTER" />

      <main className="flex flex-col items-center min-h-screen py-5 max-w-[300px] mx-auto">
        <div className="border ">
          <img src={props.response?.image} alt="" />
          <div className=" text-white px-3 py-3 text-xl">
            <H3Span info="Name: " data={props.response?.name} />
            <H3Span info="Gender: " data={props.response?.gender} />
            <H3Span info="Specie: " data={props.response?.species} />

            <Link
              href={`locationDetails?number=${extractedNumber(
                props.response?.location.url
              )}`}
            >
              <H3Span
                info="Location: "
                data={props.response?.location.name}
                classN="underline"
                symbol="🔗"
              />
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
