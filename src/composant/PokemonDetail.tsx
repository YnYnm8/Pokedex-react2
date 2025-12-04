import type { PokemonApi } from "../App"
import Pokemon from "./Pokemon";

type DetailProps = {
  pokemon: PokemonApi | null;

}

export default function PokemonDetail({ pokemon }: DetailProps) {

  if (!pokemon) {
    return <div>Selectionnez un pokémon</div>
  }


  return (
    <div className="pokemondetail">
      <p># {pokemon.id}</p>
      <img className="detail-img" src={pokemon.image} alt={pokemon.name} />
      <h2>{pokemon.name} </h2>

      <p>Type</p>
      <div className="type">
        {pokemon.apiTypes.map((type) => (
          <img
            key={type.name}
            src={type.image}
            alt={type.name} />
        ))}
      </div>
      <div>
        <p>Evolution</p>
        {pokemon.apiEvolutions.map((evolution) => (
          <Pokemon
            key={evolution.name}
            id={evolution.pokedexId}
            name={evolution.name}
            sprite= {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.pokedexId}.png`}
          />
       
        ))}
      </div>
    </div>
  )
}
