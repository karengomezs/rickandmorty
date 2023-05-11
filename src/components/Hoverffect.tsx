import Link from "next/link";

interface Props {
  linkHref: string;
  imgSrc: string;
  characterName: string;
}

export default function HoverEffect({
  linkHref,
  imgSrc,
  characterName,
}: Props) {
  return (
    <Link className="group" href={linkHref}>
      <div className="w-full h-full relative">
        <img src={imgSrc} alt="" />
        <div className="absolute bottom-0 bg-black opacity-25 group-hover:opacity-100 text-white w-full h-10 flex justify-center items-center">
          <p className="text-xl text-ellipsis overflow-hidden whitespace-nowrap">
            {characterName}
          </p>
        </div>
      </div>
    </Link>
  );
}
