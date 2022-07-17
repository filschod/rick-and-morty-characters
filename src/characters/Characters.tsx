import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_CHARACTERS = gql`
    query getCharacters($page: Int) {
        characters(page: $page) {
            results {
                name
            }
        }
    }
`;
interface CharacterModel {
    name: string;
}

const Characters = (): JSX.Element => {
    const [page] = useState(1);
    const { data, loading } = useQuery(GET_CHARACTERS, {
        variables: { page },
    });

    return (
        <div>
            {loading ? <p>loading...</p> : data.characters.results.map(({ name }: CharacterModel) => <div>{name}</div>)}
        </div>
    );
};

export default Characters;
