import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_CHARACTERS = gql`
    query getCharacters($page: Int, $searchWord: String) {
        characters(page: $page, filter: { name: $searchWord }) {
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
    const [searchWord, setSearchWord] = useState('');
    const { data, loading } = useQuery(GET_CHARACTERS, {
        variables: { page, searchWord },
    });

    return (
        <div>
            <input value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
            {loading ? <p>loading...</p> : data.characters.results.map(({ name }: CharacterModel) => <div>{name}</div>)}
        </div>
    );
};

export default Characters;
