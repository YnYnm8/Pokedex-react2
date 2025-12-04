import { useEffect, useState } from 'react'
import PokemonDetail from './composant/PokemonDetail'
import SearchBar from './composant/SearchBar'
import PokemonList from './composant/PokemonList'
import './style.css'

// 🔹 API から取得するポケモンデータの型（TypeScript）
export type PokemonApi = {
  id: number,
  name: string,
  sprite: string,
  image: string,
  apiTypes: {
    name: string,
    image: string
  }[];
  apiEvolutions:{
    name:string,
    pokedexId:number
  }[];
}

export default function App() {

  // 🔹 API から取得したポケモン一覧を保存しておくためのステート
  const [pokemons, setPokemons] = useState<PokemonApi[]>([])

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonApi | null>(null)

  // 🔹 検索フォームに入力された文字を保存するステート
  const [searchValue, setSearchValue] = useState("")

  // 🔹 アプリが最初に読み込まれたときだけ API からデータを取得する
  useEffect(() => {
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/limit/100`)
      .then((res) => res.json())
      .then((pokemons: PokemonApi[]) => {
        // 取得したポケモンデータをステートに保存
        setPokemons(pokemons)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 🔹 検索欄に入力された文字でポケモンをフィルタリングする
  const filteredPokemons = pokemons.filter((pokemon) => {
    const query = searchValue.toLowerCase(); // 検索文字を小文字に変換

    // 何も入力されていなければ全ポケモンを表示
    if (query === "") return true;

    // 名前に検索文字が含まれているかチェック（部分一致）
    const nameMatch = pokemon.name.toLowerCase().includes(query);

    // ID に検索文字が含まれているかチェック（25 → 25, 125 など）
    const idMatch = String(pokemon.id).includes(query);

    // 名前または ID のどちらかが一致したら表示
    return nameMatch || idMatch;
  });

  return (
    <div className='page'>

      {/* 🔹 左側：フィルタされたポケモンの一覧を表示する */}
      <div className='container-left'>
        <PokemonList pokemons={filteredPokemons}onSelect={setSelectedPokemon} />
      </div>

      {/* 🔹 右側：検索バーとポケモンの詳細表示 */}
      <div className='container-right'>
        {/* 🔸 SearchBar の OnSearch に setSearchValue を渡しているので、
             検索バーで入力するたびに searchValue が更新される */}
        <SearchBar OnSearch={setSearchValue} />

        {/* 🔸 詳細ページ（クリックしたポケモンを表示するときに今後使う） */}
        <PokemonDetail
         pokemon={selectedPokemon} 
         
         />
      </div>
    </div>
  )
}
