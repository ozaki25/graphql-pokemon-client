import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_ALL_POKEMON } from '../graphql/schema';

function PokemonListContainer() {
  const { loading, error, data } = useQuery(GET_ALL_POKEMON);
  console.log({ loading, error, data });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return <PokemonList pokemons={data.pokemons} />;
}

function PokemonList({ pokemons }) {
  const history = useHistory();
  return pokemons.map(({ id, name, image }) => (
    <button onClick={() => history.push(`/pokemons/${id}`)} key={id}>
      <p>
        No.{id} {name}
      </p>
      <img src={image} alt={name} height="150" />
    </button>
  ));
}

export default PokemonListContainer;
