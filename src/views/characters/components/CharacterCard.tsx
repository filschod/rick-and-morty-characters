import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { CharacterModel } from '../models/Characters.type';

const CharacterCard = ({ name, image }: CharacterModel): JSX.Element => {
    return (
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
    );
};

export default CharacterCard;
