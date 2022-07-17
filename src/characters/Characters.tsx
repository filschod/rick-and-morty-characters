import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_CHARACTERS = gql`
    query getCharacters($page: Int, $searchWord: String, $selectedStatus: String) {
        characters(page: $page, filter: { name: $searchWord, status: $selectedStatus }) {
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
    const [selectedStatus, setSelectedStatus] = useState('');
    const { data, loading } = useQuery(GET_CHARACTERS, {
        variables: { page, searchWord, selectedStatus },
    });

    return (
        <div>
            <input value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
            <input
                type='checkbox'
                checked={selectedStatus === ''}
                onChange={(e) => e.target.checked && setSelectedStatus('')}
            />{' '}
            Any
            <input
                type='checkbox'
                checked={selectedStatus === 'Alive'}
                onChange={(e) => e.target.checked && setSelectedStatus('Alive')}
            />{' '}
            Alive
            <input
                type='checkbox'
                checked={selectedStatus === 'Dead'}
                onChange={(e) => e.target.checked && setSelectedStatus('Dead')}
            />{' '}
            Dead
            <input
                type='checkbox'
                checked={selectedStatus === 'Unknown'}
                onChange={(e) => e.target.checked && setSelectedStatus('Unknown')}
            />{' '}
            Unknown
            {loading ? <p>loading...</p> : data.characters.results.map(({ name }: CharacterModel) => <div>{name}</div>)}
        </div>
    );
};

export default Characters;
