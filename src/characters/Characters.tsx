import { UIEvent, useState } from 'react';
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
    const [page, setPage] = useState(1);
    const [searchWord, setSearchWord] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const { data, fetchMore } = useQuery(GET_CHARACTERS, {
        variables: { page: 1, searchWord, selectedStatus },
    });

    const loadMoreCharacters = (): void => {
        fetchMore({
            variables: {
                page: page + 1,
                searchWord,
                selectedStatus,
            },
            updateQuery: (prevState, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prevState;
                const newCharacters = {
                    characters: {
                        __typename: 'Characters',
                        results: [...prevState.characters.results, ...fetchMoreResult.characters.results],
                    },
                };
                return newCharacters;
            },
        });
        setPage((prevState) => prevState + 1);
    };

    const scrollHandler = ({ currentTarget }: UIEvent, loadMore: { (): void; (): void }): void => {
        if (currentTarget.scrollTop + currentTarget.clientHeight >= currentTarget.scrollHeight) {
            loadMore();
        }
    };

    return (
        <div style={{ maxHeight: '100vh', overflowY: 'auto' }} onScroll={(e) => scrollHandler(e, loadMoreCharacters)}>
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
            {/* {loading && <p style={{ position: 'fixed', top: 100, left: 100 }}>loading...</p>} */}
            {data?.characters?.results?.map(({ name }: CharacterModel) => (
                <div style={{ height: '200px' }}>{name}</div>
            ))}
        </div>
    );
};

export default Characters;
