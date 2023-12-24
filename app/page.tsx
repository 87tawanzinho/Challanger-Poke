"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
interface PokemonDetails {
  name: string;
  base_experience: number; // Assuming base_experience is a number
  sprites: {
    front_default: string;
  };
  url: string;
}
interface Dating {
  name: string;
  url: string;
}

//Consumir a API e listar todos os pokémons que a consulta do seguinte endpoint retornar: https://pokeapi.co/api/v2/pokemon

//Você deve exibir NOME, EXPERIÊNCIA e IMAGEM de cada pokémon.
export default function Home() {
  const [data, setData] = useState<Dating[]>([]);

  const fetchData = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
      const arrayFiltered = [...response.data.results];
      console.log(response.data.results);
      arrayFiltered.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setData(arrayFiltered);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main>
      {data.map((item) => (
        <Pokemon key={item.name} data={item} />
      ))}
    </main>
  );
}

const Pokemon = ({ data }: { data: PokemonDetails }) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    axios.get(data.url).then((response) => setDetails(response.data));
  }, []);
  if (details === null) {
    return <div></div>;
  }

  return (
    <div>
      <span>
        {" "}
        <b>{JSON.stringify(details.name)}</b>- EXP {details.base_experience}
      </span>
      <span>
        <img src={details.sprites.front_default} alt="" />
      </span>
    </div>
  );
};
