import { useState } from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils";

function SideNav(props) {
  const { selectedPokemon, setSelectedPokemon } = props;

  const [searchValue, setSearchValue] = useState("");

  const filteredPokemon = first151Pokemon.filter((el, elIndex) => {
    if (getFullPokedexNumber(elIndex).includes(searchValue)) {
      return true;
    }

    if (el.toLowerCase().includes(searchValue.toLowerCase())) return true;

    return false;
  });
  return (
    <nav>
      <div className="header">
        <h1 className="text-gradient">Pokédex</h1>
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      {filteredPokemon.map((pokemon, pokeIndex) => {
        const truePokedexNumber = first151Pokemon.indexOf(pokemon);

        return (
          <button
            onClick={() => {
              setSelectedPokemon(truePokedexNumber);
            }}
            className={
              `nav-card` +
              (pokeIndex === selectedPokemon ? " nav-card-selected" : " ")
            }
            key={pokeIndex}
          >
            <p>{getFullPokedexNumber(truePokedexNumber)}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
}

export default SideNav;
