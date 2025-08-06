import { useState } from "react";
import type { PosicaoVeiculoProps } from "./interfaces";

export const LocalizacaoUsuario = () => {
  const [coordenadas, setCoordenadas] = useState<PosicaoVeiculoProps | null>(null);
  const [erro, setErro] = useState("");

  const obterLocalizacao = (): Promise<PosicaoVeiculoProps> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          };
          setCoordenadas(pos);
          resolve(pos);
        },
        (err) => {
          setErro("Erro ao obter localização");
          reject(err);
        }
      );
    });
  };

  return { obterLocalizacao, coordenadas, erro };
};
