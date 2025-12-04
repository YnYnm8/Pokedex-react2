import type { PokemonApi } from "../App"
import Pokemon from "./Pokemon"


type ListProps ={
  pokemons:PokemonApi[]
  onSelect:(pokemon:PokemonApi)=>void

}
export default function PokemonList({pokemons,onSelect}:ListProps) {
  return (
    <div className="pokemonlist">
      {pokemons.map((pokemon) =>
            <Pokemon
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              sprite={pokemon.sprite}
              onClick={() =>onSelect(pokemon)}
            />
          )}
    </div>
  )
}