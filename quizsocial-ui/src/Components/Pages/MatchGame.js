import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import API from '../../API_Interface/API_Interface';

const MatchGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameSize, setGameSize] = useState(0); // 0 implies no size selected

    useEffect(() => {
        if (gameSize !== 0) {
            fetchQuizzes();
        }
    }, [gameSize]);

    const fetchQuizzes = async () => {
        const api = new API();
        try {
            const response = await api.getQuestionsForQuiz('001');
            const pairsNeeded = gameSize * gameSize / 2;  // Calculate needed pairs based on game size

            if (response.data && response.data.length >= pairsNeeded) {
                // Create potential pairs
                const potentialPairs = response.data.slice(0, pairsNeeded).flatMap(d => [
                    { id: d.questionID + '-q', content: d.question, type: 'question', questionID: d.questionID },
                    { id: d.questionID + '-a', content: d.answer, type: 'answer', questionID: d.questionID }
                ]);

                // Shuffle cards to randomize the board layout
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
                const newMatches = [...matchedPairs, newFlippedIndices[0], newFlippedIndices[1]]; // Add both indices of the matched cards
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
        if (matches.length === cards.length) { // Check if the length of matchedPairs equals the number of cards
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

    return (
        <Box sx={{ flexGrow: 1, textAlign: 'center', maxWidth: 800, margin: 'auto' }}>
            <Typography variant="h4" sx={{ m: 4 }}>Match Game</Typography>
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
                                    <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                        {flippedIndices.includes(index) || matchedPairs.includes(index) ? card.content : 'Click to reveal'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            {gameOver && (
                <Typography variant="h5" sx={{ mt: 4 }}>You got it!</Typography>
            )}
        </Box>
    );
};

export default MatchGame;