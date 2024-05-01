import React, {useEffect, useState} from 'react';
import {Typography, Paper, Grid, Rating, Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useParams, useNavigate, Link} from 'react-router-dom';
import API from '../../API_Interface/API_Interface';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";


export default function Quiz({loggedInUser}) {

    const {quizID} = useParams();
    const navigate = useNavigate();

    
    const [quizInfo, setQuizInfo] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [rating, setRating] = useState(0);
    const [isRated, setIsRated] = useState(true);
    const [favorited, setFavorited] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const handleRating = newRating => {

        setIsRated(true)

        const api = new API();

        async function newQuizRating() {
            try {
                await api.rateQuiz(quizID, loggedInUser, newRating);
                console.log("added new rating");
            } catch (error) {
                console.error("Error adding new rating", error);
            }
        }

        async function getRatings() {
            api.getQuizRatings(quizID)
                .then( ratingsJSONstring => {
                    console.log(`api ratings: ${JSON.stringify(ratingsJSONstring)})`);
                    setRating(ratingsJSONstring.data.rating);
                })
        }

        newQuizRating();
        getRatings();
    };

    const handleUnfavorite = () => {
        const api = new API();

        async function unfavorite() {
            try {
                await api.unfavoriteQuiz(quizID, loggedInUser);
                console.log("Successfully unfavorited.");
            } catch (error) {
                console.error("Error unfavoriting:", error);
            }
        }

        unfavorite();
        setFavorited(false);
    };

    const handleFavorite = () => {
        const api = new API();

        async function favorite() {
            try {
                await api.favoriteQuiz(quizID, loggedInUser);
                console.log("Successfully favorited.");
            } catch (error) {
                console.error("Error favoriting:", error);
            }
        }

        favorite();
        setFavorited(true);
    };

    const handleCopy = () => {
        const api = new API();
        const copyTitle = "Copy of " + quizInfo.title;
        async function copyQuiz() {
            try {
                const newQuiz = await api.createQuiz(loggedInUser, copyTitle);
                const newQuizID = newQuiz.data.insertId;
                questions.map(async (qaPair) => {
                    try {
                        await api.addQuestion(newQuizID, qaPair.question, qaPair.answer);
                    } catch (error) {
                        console.error("Error adding question and answer", error);
                    }
                })
            } catch (error) {
                console.error("Error creating quiz:", error);
            }
        }
        copyQuiz();
        setIsDialogOpen(true);
    };

    useEffect(() => {
        if (isRated) {
            const api = new API();

            async function getQuizInfoById() {

                api.getQuizById(quizID)
                    .then( quizJSONstring => {
                        //console.log(`api returns quiz info: ${JSON.stringify(quizJSONstring)}`);
                        setQuizInfo(quizJSONstring.data);
                    });

                api.getQuestionsForQuiz(quizID)
                    .then( questionsJSONstring => {
                        console.log(`api returns questions: ${JSON.stringify(questionsJSONstring)}`);
                        setQuestions(questionsJSONstring.data);
                    });

                api.getQuizRatings(quizID)
                    .then( ratingsJSONstring => {
                        //console.log(`api ratings: ${JSON.stringify(ratingsJSONstring)})`);
                        setRating(ratingsJSONstring.data.rating);
                    });

                console.log("getting favorite for", loggedInUser, 'and', quizID);
                api.checkFavorited(quizID, loggedInUser)
                    .then( favoritedJSONstring => {
                        console.log(`api return favorite info: ${JSON.stringify(favoritedJSONstring.status)}`);
                        if (favoritedJSONstring.status === 200) {
                            setFavorited(true);
                        }
                    });

            }

            getQuizInfoById();
            console.log('logged in', loggedInUser);

            setIsRated(false);
        }

    }, [isRated]);

    const goToFlashCards = () => {
        navigate(`/flash-cards/${quizID}`);
    };
    const goToMatchGame = () => {
        navigate(`/match-game/${quizID}`);
    };
    const goToFillingTheBlank = () => {
        navigate(`/filling-the-blank/${quizID}`);
    };

    const goToFastMC = () => {
        navigate(`/fastmc-game/${quizID}`);
    };


    if (!quizInfo.isPublic && loggedInUser !== quizInfo.userID) {
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
                <Typography variant='h3' align="center">
                    This quiz is Private.
                </Typography>
                <Typography variant='h5' mt={3} align="center">
                    Sorry for the inconvenience.
                </Typography>
            </Paper>
        )
    }

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
                            <Typography variant='h3'>{quizInfo.title}</Typography>
                        </Grid>
                        <Grid item sx={{ marginBottom: 2 }}>
                            <Typography component="span" >
                                {"By: "}
                            </Typography>
                            <Link
                                underline="hover" // corrected the property name
                                to={`/profile/${quizInfo.userID}`} // dynamically building the URL
                            >
                                {quizInfo.username}
                            </Link>
                        </Grid>
                        <Grid item sx={{marginBottom: 2}}>
                            <Rating
                                value={rating}
                                precision={0.5}
                                onChange={(event, newRating) => {
                                    handleRating(newRating);
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
                            {
                                loggedInUser != undefined && favorited ? (
                                    <Button 
                                        variant='outlined' 
                                        endIcon={<StarIcon />}
                                        onClick={handleUnfavorite}
                                        sx={{
                                            border: 0,
                                            color:'white',
                                            backgroundColor:'#535C91',
                                            '&:hover':{
                                                backgroundColor:'#404E7C'
                                            }
                                        }}
                                    >
                                        Unfavorite
                                    </Button>
                                ) : (
                                    <Button
                                        variant='outlined'
                                        endIcon={<StarIcon />}
                                        onClick={handleFavorite}
                                        sx={{
                                            border: 0,
                                            color:'white',
                                            backgroundColor:'#535C91',
                                            '&:hover':{
                                                backgroundColor:'#404E7C'
                                            }
                                        }}
                                    >
                                        Favorite
                                    </Button>
                                )
                            }
                        </Grid>
                        <Grid item>
                            <Button variant='outlined' onClick={handleCopy}
                                    sx={{
                                        border: 0,
                                        color:'white',
                                        backgroundColor:'#535C91',
                                        '&:hover':{
                                            backgroundColor:'#404E7C'
                                        }
                                    }}
                            >
                                Copy
                            </Button>
                        </Grid>
                        <Dialog
                            open={isDialogOpen}
                            onClose={() => setIsDialogOpen(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            BackdropProps={{ invisible: true }}
                        >
                            <DialogTitle id="alert-dialog-title">Success!</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {quizInfo.title} has been added to your profile.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setIsDialogOpen(false)}
                                        sx={{
                                            border: 0,
                                            mr: 2,
                                            color:'white',
                                            backgroundColor:'#535C91',
                                            '&:hover':{
                                                backgroundColor:'#404E7C'
                                            }
                                        }}
                                >
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Grid item>
                        {
                            loggedInUser === quizInfo.userID ? (
                                <IconButton onClick={() => {
                                    navigate(`/edit-quiz/${quizID}`);
                                }}>
                                    <SettingsIcon/>
                                </IconButton>
                            ) : (
                                <IconButton disabled>
                                    <SettingsIcon style={{ color: 'transparent' }}/>
                                </IconButton>
                            )
                        }
                            
                        </Grid>
                    </Grid>
                </Grid>
                {/* Buttons for study methods */}
                <Grid container spacing={5} justifyContent={'center'}>
                    <Grid item>
                        <Button
                            variant='outlined'
                            style={{ maxWidth: '100px', maxHeight: '100px', minWidth: '100px', minHeight: '100px' }}
                            onClick={goToFlashCards}
                            sx={{
                                border: 0,
                                mt: 2,
                                color:'white',
                                backgroundColor:'#535C91',
                                '&:hover':{
                                    backgroundColor:'#404E7C'
                                }

                            }}
                        >

                            Flash Card
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant='outlined'
                            style={{ maxWidth: '100px', maxHeight: '100px', minWidth: '100px', minHeight: '100px' }}
                            onClick={goToFillingTheBlank}
                            sx={{
                                border: 0,
                                mt: 2,
                                color:'white',
                                backgroundColor:'#535C91',
                                '&:hover':{
                                    backgroundColor:'#404E7C'
                                }

                            }}
                        >
                            Fill in the Blank
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant='outlined'
                            style={{ maxWidth: '100px', maxHeight: '100px', minWidth: '100px', minHeight: '100px' }}
                            onClick={goToMatchGame}
                            sx={{
                                border: 0,
                                mt: 2,
                                color:'white',
                                backgroundColor:'#535C91',
                                '&:hover':{
                                    backgroundColor:'#404E7C'
                                }

                            }}
                        >
                            Memory Match
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant='outlined'
                            style={{maxWidth: '100px', maxHeight: '100px', minWidth: '100px', minHeight: '100px'}}
                            onClick={goToFastMC}
                            sx={{
                                border: 0,
                                mt: 2,
                                color:'white',
                                backgroundColor:'#535C91',
                                '&:hover':{
                                    backgroundColor:'#404E7C'
                                }

                            }}
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
                            {questions.map((row) => (
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