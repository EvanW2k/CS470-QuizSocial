import React, { useState, useEffect } from 'react';
import {Box, Card, CardContent, Typography, Grid, Button, Paper} from '@mui/material';
import API from '../../../API_Interface/API_Interface';
import { useParams } from 'react-router-dom';

const MatchGame = ({loggedInUser}) => {
    const { quizID } = useParams();
    console.log("MatchGame Loaded", quizID);
    const [cards, setCards] = useState([]);
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameSize, setGameSize] = useState(0);

    const [quizInfo, setQuizInfo] = useState([]);

    useEffect(() => {
        if (gameSize !== 0) {
            fetchQuizzes();
        }
    }, [gameSize]);

    const fetchQuizzes = async () => {
        const api = new API();
        try {

            const quiz = await api.getQuizById(quizID);
            console.log(`api returns quiz info: ${JSON.stringify(quiz)}`);
            setQuizInfo(quiz.data);

            const response = await api.getQuestionsForQuiz(quizID);
            const pairsNeeded = gameSize * gameSize / 2;

            if (response.data && response.data.length >= pairsNeeded) {
                // Create potential pairs
                const potentialPairs = response.data.slice(0, pairsNeeded).flatMap(d => [
                    { id: d.questionID + '-q', content: d.question, type: 'question', questionID: d.questionID },
                    { id: d.questionID + '-a', content: d.answer, type: 'answer', questionID: d.questionID }
                ]);


                const shuffledCards = shuffleArray(potentialPairs);

                setCards(shuffledCards);
            } else {
                console.error('Not enough quizzes found');
                alert('Not enough questions to fill the board. Please choose a smaller size or add more questions.');
            }
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
        }
    };

    const handleCardClick = index => {
        if (gameOver || matchedPairs.includes(index) || (flippedIndices.length === 2 && !flippedIndices.includes(index))) {
            return;
        }

        const newFlippedIndices = flippedIndices.includes(index) ? flippedIndices : [...flippedIndices, index];
        setFlippedIndices(newFlippedIndices);

        if (newFlippedIndices.length === 2) {
            const match = checkForMatch(newFlippedIndices);
            if (match) {
                const newMatches = [...matchedPairs, newFlippedIndices[0], newFlippedIndices[1]];
                setMatchedPairs(newMatches);
                setFlippedIndices([]);
                checkGameOver(newMatches);
            } else {
                setTimeout(() => {
                    setFlippedIndices(flippedIndices.filter(i => !newFlippedIndices.includes(i)));
                }, 1000);
            }
        }
    };

    const checkForMatch = (indices) => {
        const firstCard = cards[indices[0]];
        const secondCard = cards[indices[1]];
        return firstCard.questionID === secondCard.questionID && firstCard.type !== secondCard.type;
    };

    const checkGameOver = (matches) => {
        if (matches.length === cards.length) {
            console.log('Game ended');
            setGameOver(true);
        }
    };

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    if (!quizInfo.isPublic && loggedInUser !== quizInfo.userID && quizInfo.length) {
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
        <Box sx={{ flexGrow: 1, textAlign: 'center', maxWidth: 800, margin: 'auto' }}>
            <Typography variant="h4" sx={{ m: 4 }}>Match Game</Typography>
            {gameOver && (
                <Typography variant="h5" sx={{ mt: 4 }}>You got it!</Typography>
            )}
            {!gameSize ? (
                <Box>
                    <Button variant="contained" onClick={() => setGameSize(4)}>4x4 Game</Button>
                    <Button variant="contained" sx={{ ml: 2 }} onClick={() => setGameSize(6)}>6x6 Game</Button>
                </Box>
            ) : (
                <Grid container spacing={2} justifyContent="center">
                    {cards.map((card, index) => (
                        <Grid item key={card.id} xs={12 / gameSize} style={{ maxWidth: `${100 / gameSize}%` }}>
                            <Card sx={{ width: '100%', height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid lightgray', borderRadius: '5px', overflow: 'hidden',
                                backgroundColor: matchedPairs.includes(index) ? 'lightgreen' : (flippedIndices.includes(index) ? 'lightblue' : 'lightgray') }}
                                  onClick={() => handleCardClick(index)}>
                                <CardContent>
                                    <Typography variant="body1" sx={{ textAlign: 'center', color:'black' }}>
                                        {flippedIndices.includes(index) || matchedPairs.includes(index) ? card.content : 'Click to reveal'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

        </Box>
    );
};

export default MatchGame;
