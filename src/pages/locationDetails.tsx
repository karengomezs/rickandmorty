import { getDetailsLocation, LocationResult } from "@/api/callsApi";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const params = (context.query.number as string) || "";

  let response = null;

  if (params !== "") {
    response = await getDetailsLocation(params);
  }

  return { props: { response } };
};

type Props = { response: LocationResult | null };

export default function LocationDetails(props: Props) {
  function extractedNumber(text: string | undefined): string | undefined {
    const textArr = text?.split("/");
    const number = textArr?.[textArr.length - 1];
    return number;
  }

  const residents = props.response?.residents.map((resident) => {
    return (
      <Link
        key={resident}
        href={`/details?idCharacter=${extractedNumber(resident)}`}
      >
        <li>Resident {extractedNumber(resident)}</li>
      </Link>
    );
  });

  return (
    <>
      <h1 className="text-3xl text-center">DETAILS LOCATION</h1>
      <main className="flex flex-col min-h-screen py-10 px-4 max-w-6xl mx-auto">
        <h3>Name: {props.response?.name}</h3>
        <h3>Type: {props.response?.type}</h3>
        <h3>Dimension: {props.response?.dimension}</h3>
        <h3>RESIDENTS</h3>
        <ul>{residents}</ul>
      </main>
    </>
  );
}
