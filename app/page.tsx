"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

//Consumir a API e listar todos os pokémons que a consulta do seguinte endpoint retornar: https://pokeapi.co/api/v2/pokemon

//Você deve exibir NOME, EXPERIÊNCIA e IMAGEM de cada pokémon.
export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => setData(response.data.results));
  }, []);
  return (
    <main>
      {data.map((item) => (
        <Pokemon data={item} />
      ))}
    </main>
  );
}

const Pokemon = ({ data }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(data.url).then((response) => setDetails(response.data));
  }, []);
  if (details === null) {
    return <div></div>;
  }

  return <div>{JSON.stringify(details.name)}</div>;
};
