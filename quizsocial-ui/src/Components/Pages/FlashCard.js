
import API from '../../API_Interface/API_Interface'
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';


export default function FlashCard(props) {
    const [cards, setCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isQuestion, setIsQuestion] = useState(true);  // State to toggle between question and answer

    useEffect(() => {
        const fetchQuizzes = async () => {
            const api = new API();
            try {
                const response = await api.getQuestionsForQuiz('001');  // Assuming '001' is the quizID you want
                if (response.data && response.data.length > 0) {
                    setCards(response.data);
                } else {
                    console.log('No quizzes found');
                }
            } catch (error) {
                console.error('Failed to fetch quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    const handlePrev = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        }
    };

    const flipCard = () => {
        setIsQuestion(!isQuestion);
    };

    return (
        <Box sx={{ maxWidth: 650, margin: 'auto', textAlign: 'center', mt: 4 }}>
            {cards.length > 0 && (
                <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h5" sx={{ fontSize: 20, mb: 2 }}>
                            {isQuestion ? 'Question' : 'Answer'}:
                        </Typography>
                        <Typography sx={{ fontSize: 18 }}>
                            {isQuestion ? cards[currentCardIndex].question : cards[currentCardIndex].answer}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2 }}>
                        <Button onClick={handlePrev} disabled={currentCardIndex === 0}>
                            Previous
                        </Button>
                        <Button onClick={flipCard}>
                            Flip
                        </Button>
                        <Button onClick={handleNext} disabled={currentCardIndex === cards.length - 1}>
                            Next
                        </Button>
                    </Box>
                </Card>
            )}
            {cards.length === 0 && <Typography>No cards available for this quiz.</Typography>}
        </Box>
    );
};