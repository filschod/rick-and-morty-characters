import { UIEvent, useState } from 'react';
import { useQuery } from '@apollo/client';
import { SelectChangeEvent } from '@mui/material';
import * as CharactersQuery from '../helpers/CharactersQuery';

const Characters = (): any => {
    const [page, setPage] = useState(1);
    const [searchWord, setSearchWord] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const { data, loading, fetchMore } = useQuery(CharactersQuery.GET_CHARACTERS, {
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

    const scrollHandler = ({ currentTarget }: UIEvent): void => {
        if (currentTarget.scrollTop + currentTarget.clientHeight >= currentTarget.scrollHeight) {
            loadMoreCharacters();
        }
    };

    const selectedStatusChangeHandler = (e: SelectChangeEvent<unknown>): void => {
        const newStatus = e.target.value as string;
        setSelectedStatus(newStatus);
    };

    const searchWordChangeHandler = (e: SelectChangeEvent<unknown>): void => {
        const newSearchWord = e.target.value as string;
        setSearchWord(newSearchWord);
    };

    return {
        data,
        loading,
        searchWord,
        selectedStatus,
        scrollHandler,
        searchWordChangeHandler,
        selectedStatusChangeHandler,
    };
};

export default Characters;
