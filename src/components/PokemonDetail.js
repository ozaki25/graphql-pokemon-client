import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_POKEMON_BY_ID } from '../graphql/schema';
import { useParams, Link } from 'react-router-dom';

function PokemonDetailContainer() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POKEMON_BY_ID, {
    variables: { id },
  });
  console.log({ loading, error, data });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return <PokemonDetail pokemon={data.pokemon} />;
}

function PokemonDetail({ pokemon }) {
  const {
    id,
    name,
    image,
    classification,
    types,
    height,
    weight,
    evolutions,
  } = pokemon;
  return (
    <div>
      <dl>
        <dt>No.</dt>
        <dd>{id}</dd>
        <dt>名前</dt>
        <dd>{name}</dd>
        <dt>種別</dt>
        <dd>{classification}</dd>
        <dt>タイプ</dt>
        <dd>{types}</dd>
        <dt>全長</dt>
        <dd>
          {height.minimum}〜{height.maximum}
        </dd>
        <dt>重量</dt>
        <dd>
          {weight.minimum}〜{weight.maximum}
        </dd>
        <dt>進化</dt>
        <dd>
          {evolutions
            ? evolutions.map(poke => (
                <>
                  <Link to={`/pokemons/${poke.id}`} key={poke.id}>
                    {poke.name}
                  </Link>
                  <br />
                </>
              ))
            : 'なし'}
        </dd>
      </dl>
      <img src={image} alt={name} height="300" />
    </div>
  );
}

export default PokemonDetailContainer;
