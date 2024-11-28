import { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import TypeCard from "./TypeCard";

function PokeCard(props) {
  const { selectedPokemon } = props;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { name, height, abilitites, stats, types, moves, sprites } = data || {};

  useEffect(() => {
    //loading state
    if (loading || !localStorage) return;
    //check if selected pokemon info is available in cache
    //1. define cache
    let cache = {};
    if (localStorage.getItem("pokemon")) {
      cache = JSON.parse(localStorage.getItem("pokemon"));
    }

    //2. check is selected pokemon is in cache. Otherwise, fetch from api
    if (selectedPokemon in cache) {
      //read from cache
      setData(cache[selectedPokemon]);
      return;
    }

    //fetch new data
    async function fetchPokemonData() {
      setLoading(true);
      try {
        const baseUrl = `https://pokeapi.co/api/v2/`;
        const suffix = `pokemon/${getPokedexNumber(selectedPokemon)}`;
        console.log(suffix);

        const finalUrl = baseUrl + suffix;
        const res = await fetch(finalUrl);
        const pokemonData = await res.json();
        setData(pokemonData);
        console.log(pokemonData);
        //save to cache
        cache[selectedPokemon] = pokemonData;

        localStorage.setItem("pokemon", JSON.stringify(cache));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();
  }, [selectedPokemon]);

  if (loading || !data) {
    return (
      <>
        <div>
          <h4>Loading...</h4>
          <h2>{name}</h2>
        </div>
      </>
    );
  }

  return (
    <div className="poke-card">
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h2>{name}</h2>
      </div>
      <div className="type-container">
        {types.map((typeObj, typeIndex) => {
          return <TypeCard key={typeIndex} type={typeObj?.type?.name} />;
        })}
      </div>
      <img
        className="default-img"
        src={`/pokemon/${getFullPokedexNumber(selectedPokemon)}.png`}
        alt={`${name}-large-img`}
      />
    </div>
  );
}

export default PokeCard;
