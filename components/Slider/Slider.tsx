import estilos from "./Slider.module.css";
import { useState } from "react";

type Props = { imagenes: string[] | undefined; mount?: number };

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
  console.log({ imagenActual });

  return (
    <div className={estilos.container}>
      <button onClick={anteriorImg}>{"<"}</button>
      {imagenes.map((imagen: string, i: number) => {
        return (
          <div key={i}>
            {i >= imagenActual && i < imagenActual + mount && (
              <img src={imagen} alt="" />
            )}
          </div>
        );
      })}
      <button onClick={siguienteImg}>{">"}</button>
    </div>
  );
}
