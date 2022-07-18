import { Box, InputLabel, CircularProgress, MenuItem, Select, Stack } from '@mui/material';
import StyledTextfield from './StyledTextField';
import StyledFormControl from './StyledFormControl';
import useCharacters from '../hooks/useCharacters';
import * as T from '../models/Characters.type';
import CharacterCard from './CharacterCard';

const CharactersView = (): JSX.Element => {
    const Characters = useCharacters();

    return (
        <div
            style={{
                minHeight: '100vh',
                maxHeight: '100vh',
                overflowY: 'auto',
                color: '#12b0c9',
                backgroundColor: '#262c3a',
            }}
            onScroll={(e) => Characters.scrollHandler(e)}
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
                            value={Characters.selectedStatus}
                            label='Selected status'
                            onChange={Characters.selectedStatusChangeHandler}
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
                    value={Characters.searchWord}
                    onChange={Characters.searchWordChangeHandler}
                />
            </Stack>
            <Stack direction='row' flexWrap='wrap' justifyContent='center'>
                {Characters.data?.characters?.results?.map(({ name, image, id }: T.CharacterModel) => (
                    <CharacterCard key={id} name={name} image={image} />
                ))}
                {Characters.loading && (
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

export default CharactersView;
