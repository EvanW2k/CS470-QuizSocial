import {useEffect, useState} from 'react';
import {Typography, Paper, Grid, Rating, Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useParams } from 'react-router-dom';


export default function Main() {

    const {quizID} = useParams();
    const [rating, setRating] = useState(0);

    const owner = "Evan_Walters";
    const qaList = [
        { question: 'Question 1', answer: 'Answer 1' },
        { question: 'Question 2', answer: 'Answer 2' },
        { question: 'Question 3', answer: 'Answer 3' },
    ];

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
                            <Button variant='outlined' endIcon={<StarIcon />}>
                                Favorite
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant='outlined'>
                                Copy
                            </Button>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label='like'>
                                <ThumbUpIcon/>
                            </IconButton>
                            <IconButton aria-label='dislike'>
                                <ThumbDownIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Buttons for study methods */}
                <Grid container spacing={5} justifyContent={'center'}>
                    <Grid item>
                        <Button 
                            variant='outlined'
                            style={{maxWidth: '100px', maxHeight: '100px', minWidth: '100px', minHeight: '100px'}}
                        >
                            Flash Card
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant='outlined'
                            style={{maxWidth: '100px', maxHeight: '100px', minWidth: '100px', minHeight: '100px'}}
                        >
                            Multiple Choice
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant='outlined'
                            style={{maxWidth: '100px', maxHeight: '100px', minWidth: '100px', minHeight: '100px'}}
                        >
                            Fill in the Blank
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant='outlined'
                            style={{maxWidth: '100px', maxHeight: '100px', minWidth: '100px', minHeight: '100px'}}
                        >
                            Memory Match
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant='outlined'
                            style={{maxWidth: '100px', maxHeight: '100px', minWidth: '100px', minHeight: '100px'}}
                        >
                            Fast Multiple Choice
                        </Button>
                    </Grid>
                </Grid>
                {/* Questions and Answers */}
                <TableContainer>
                    <Table aria-label='questions and answers'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Questions</TableCell>
                                <TableCell align='justify'>Answers</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {qaList.map((row) => (
                                <TableRow
                                    key={row.question}
                                >
                                    <TableCell>{row.question}</TableCell>
                                    <TableCell align='justify'>{row.answer}</TableCell>
                                </TableRow>    
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Paper>
        
    )

}