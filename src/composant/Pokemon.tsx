type PokemonProps ={
id:number,
name:string,
sprite:string,
onClick?:()=>void
};

export default function Pokemon({id,name,sprite ,onClick}:PokemonProps) {

  return (
    <div onClick ={onClick}className="pokemon">
      <p>{id}:{name}</p>


      <img className="pokemon-sprite" src={sprite} alt="" />
    </div>

  )
}