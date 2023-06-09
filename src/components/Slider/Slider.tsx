import estilos from "./Slider.module.css";
import Link from "next/link";
import { useState } from "react";
import HoverEffect from "../Hoverffect";

type Props = {
  imagenes: { src: string; href: string; nameCharacter: string }[] | undefined;
  mount?: number;
};

export default function Slider({ imagenes, mount = 5 }: Props) {
  const [imagenActual, setImagenActual] = useState<number>(0);
  const cantidad = imagenes?.length || 0;

  if (!Array.isArray(imagenes) || cantidad < 1) {
    return null;
  }

  const siguienteImg = () => {
    if (imagenActual === cantidad - 1) {
      setImagenActual(0);
    } else {
      setImagenActual(imagenActual + 1);
    }
  };

  const anteriorImg = () => {
    if (imagenActual === 0) {
      setImagenActual(cantidad - mount);
    } else {
      setImagenActual(imagenActual - 1);
    }
  };

  return (
    <div className={estilos.container}>
      <button
        className="text-white me-10 text-6xl hover:text-cyan-300"
        onClick={anteriorImg}
      >
        {"<"}
      </button>
      {imagenes.map((imagen, i: number) => {
        return (
          <div key={i}>
            {i >= imagenActual && i < imagenActual + mount && (
              <HoverEffect
                linkHref={imagen.href}
                imgSrc={imagen.src}
                characterName={imagen.nameCharacter}
              />
            )}
          </div>
        );
      })}
      <button
        className="text-white ms-10 text-6xl hover:text-cyan-300"
        onClick={siguienteImg}
      >
        {">"}
      </button>
    </div>
  );
}
