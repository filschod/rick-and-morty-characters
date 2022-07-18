import { UIEvent, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    FormControl,
    InputLabel,
    CircularProgress,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    styled,
    SelectChangeEvent,
} from '@mui/material';

const GET_CHARACTERS = gql`
    query getCharacters($page: Int, $searchWord: String, $selectedStatus: String) {
        characters(page: $page, filter: { name: $searchWord, status: $selectedStatus }) {
            results {
                name
                image
            }
        }
    }
`;
interface CharacterModel {
    name: string;
    image: string;
}

const StyledTextfield = styled(TextField)({
    '& .MuiOutlinedInput-input': {
        color: '#b3e028',
    },
    '& .MuiInputLabel-root': {
        color: '#b3e028',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: '#b3e028',
    },
    '&:hover .MuiOutlinedInput-input': {
        color: '#12b0c9',
    },
    '&:hover .MuiInputLabel-root': {
        color: '#12b0c9',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: '#12b0c9',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
        color: '#b3e028',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#b3e028',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#b3e028',
    },
});

const StyledFormControl = styled(FormControl)({
    '& .MuiOutlinedInput-input': {
        color: '#b3e028',
    },
    '& .MuiInputLabel-root': {
        color: '#b3e028',
    },
    '& .MuiOutlinedInput-root': {
        borderColor: '#b3e028',
    },
    '& MuiSelect-select': {
        borderColor: '#b3e028',
    },
    '&:hover .MuiOutlinedInput-input': {
        color: '#12b0c9',
    },
    '&:hover .MuiInputLabel-root': {
        color: '#12b0c9',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: '#12b0c9',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
        color: '#b3e028',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#b3e028',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#b3e028',
    },
});

const Characters = (): JSX.Element => {
    const [page, setPage] = useState(1);
    const [searchWord, setSearchWord] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('any');
    const { data, loading, fetchMore } = useQuery(GET_CHARACTERS, {
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

    const selectedStatusChangeHandler = (e: SelectChangeEvent<unknown>): void => {
        const newStatus = e.target.value as string;
        setSelectedStatus(newStatus);
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                maxHeight: '100vh',
                overflowY: 'auto',
                color: '#12b0c9',
                backgroundColor: '#262c3a',
            }}
            onScroll={(e) => scrollHandler(e, loadMoreCharacters)}
        >
            <Stack direction='row' flexWrap='wrap' justifyContent='center' alignItems='center'>
                <img
                    style={{ margin: '2em' }}
                    height='200px'
                    src='https://hyperpix.net/wp-content/uploads/2020/04/rick-and-morty-logo-font-free-download-856x484.jpg'
                    alt='Rick and Morty logo'
                />
                <Box sx={{ margin: '2em', minWidth: 230, maxWidth: 230 }}>
                    <StyledFormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>Character status</InputLabel>
                        <Select
                            sx={{ color: '#12b0c9', backgroundColor: '#02353d' }}
                            value={selectedStatus}
                            label='Selected status'
                            onChange={selectedStatusChangeHandler}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        '& .MuiMenuItem-root, ': {
                                            backgroundColor: '#02353d',
                                            color: '#b3e028',
                                        },
                                        '& .MuiMenuItem-root.Mui-selected': {
                                            color: '#12b0c9',
                                        },
                                        '& .MuiMenuItem-root:hover': {
                                            backgroundColor: '#02353d',
                                            color: '#12b0c9',
                                        },
                                        '& .MuiMenuItem-root.Mui-selected:hover': {
                                            backgroundColor: '#02353d',
                                            color: '#b3e028',
                                        },
                                    },
                                },
                            }}
                        >
                            <MenuItem value=''>Any</MenuItem>
                            <MenuItem value='Alive'>Alive</MenuItem>
                            <MenuItem value='Dead'>Dead</MenuItem>
                            <MenuItem value='Unknown'>Unknown</MenuItem>
                        </Select>
                    </StyledFormControl>
                </Box>
                <StyledTextfield
                    label='Search name'
                    variant='outlined'
                    sx={{ margin: '2em', color: '#12b0c9', backgroundColor: '#02353d' }}
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                />
            </Stack>
            <Stack direction='row' flexWrap='wrap' justifyContent='center'>
                {data?.characters?.results?.map(({ name, image }: CharacterModel) => (
                    <Card
                        sx={{
                            color: '#12b0c9',
                            backgroundColor: '#02353d',
                            border: '2px solid #b3e028',
                            boxShadow: '0px 0px 0px 10px #000000',
                            maxWidth: 300,
                            margin: '2em',
                            padding: '1em',
                        }}
                    >
                        <CardMedia component='img' height='300' width='300' image={image} alt={name} />
                        <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                                {name}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
                {loading && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            margin: '2em',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
            </Stack>
        </div>
    );
};

export default Characters;
