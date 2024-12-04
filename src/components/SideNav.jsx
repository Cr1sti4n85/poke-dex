import { useState } from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils";

function SideNav(props) {
  const { selectedPokemon, setSelectedPokemon, handleCloseMenu, showSideMenu } =
    props;

  const [searchValue, setSearchValue] = useState("");

  const filteredPokemon = first151Pokemon.filter((el, elIndex) => {
    if (getFullPokedexNumber(elIndex).includes(searchValue)) {
      return true;
    }

    if (el.toLowerCase().includes(searchValue.toLowerCase())) return true;

    return false;
  });
  return (
    <nav className={" " + (!showSideMenu ? " open" : "")}>
      <div className={"header " + (!showSideMenu ? " open" : "")}>
        <button className="open-nav-button" onClick={handleCloseMenu}>
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <h1 className="text-gradient">Pokédex</h1>
      </div>
      <input
        placeholder="Eg. 003 or Pikachu"
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
              handleCloseMenu();
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
