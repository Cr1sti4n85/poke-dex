import { first151Pokemon, getFullPokedexNumber } from "../utils";

function SideNav() {
  return (
    <nav>
      <div className="header">
        <h1 className="text-gradient">Pokédex</h1>
      </div>
      <input type="text" />
      {first151Pokemon.map((pokemon, pokeIndex) => {
        return (
          <button className={`nav-card`} key={pokeIndex}>
            <p>{getFullPokedexNumber(pokeIndex)}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
}

export default SideNav;
