import {useEffect, useState} from 'react';
import {Typography, Paper, Grid, Rating, Button} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useParams } from 'react-router-dom';


export default function Main() {

    const {quizID} = useParams();
    const [rating, setRating] = useState(0);

    const owner = "Evan_Walters";


    return (
        <Paper
            sx={{
                p: 3,
                margin: 'auto',
                mt: 3,
                justifyContent: 'center',
                alignItems: 'flex-start',
                maxWidth: 1000,
                flexGrow: 1,
                border: 0
            }}
        >
            {/* Container for the whole page */} 
            <Grid container direction='column' justifyContent='center' alignItems='flex-start'>
                {/* Container for quiz info at the top */}
                <Grid container direction='row' justifyContent='center' alignItems='flex-start'>
                    <Grid direction='column' maxWidth={500}>
                        <Grid item container direction='column' sx={{marginBottom: 2}}>
                            <Typography variant='h3'>{quizID}</Typography>
                        </Grid>
                        <Grid item sx={{marginBottom: 2}}>{"Owner: " + owner}</Grid>
                        <Grid item sx={{marginBottom: 2}}>
                            <Rating
                                value={rating}
                                onChange={(event, newRating) => {
                                    setRating(newRating)
                                }}
                            />
                        </Grid>
                    </Grid>
                    {/* Favorite, copy */}
                    <Grid 
                        container 
                        direction='column' 
                        justifyContent='flex-start' 
                        maxWidth={500} 
                        alignItems='center'
                        spacing={2}
                    >
                        <Grid item>
                            <Button variant='outlined'>
                                Favorite<StarIcon/>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant='outlined'>
                                Copy
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button><ThumbUpIcon/></Button>
                            <Button><ThumbDownIcon/></Button>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Buttons for study methods */}
            </Grid>
        </Paper>
        
    )

}