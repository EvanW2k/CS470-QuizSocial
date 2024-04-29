import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField } from '@mui/material';
import API from '../../../API_Interface/API_Interface';
import { useParams } from 'react-router-dom';
export default function FillingTheBlank(props) {
    const { quizID } = useParams();
    const [cards, setCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [answerFeedback, setAnswerFeedback] = useState('');

    useEffect(() => {
        const fetchQuizzes = async () => {
            const api = new API();
            try {
                const response = await api.getQuestionsForQuiz(quizID);
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
            setAnswerFeedback('');
            setUserAnswer('');
        }
    };

    const handleNext = () => {
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setAnswerFeedback('');
            setUserAnswer('');
        }
    };

    const checkAnswer = () => {
        if (userAnswer.trim().toLowerCase() === cards[currentCardIndex].answer.toLowerCase()) {
            setAnswerFeedback('Correct!');
        } else {
            setAnswerFeedback('Incorrect, try again!');
        }
    };

    const handleInputChange = (event) => {
        setUserAnswer(event.target.value);
    };

    return (
        <Box sx={{ maxWidth: 650, margin: 'auto', textAlign: 'center', mt: 4 }}>
            {cards.length > 0 && (
                <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h5" sx={{ fontSize: 20, mb: 2 }}>
                            Question:
                        </Typography>
                        <Typography sx={{ fontSize: 18, mb: 2 }}>
                            {cards[currentCardIndex].question}
                        </Typography>
                        <TextField
                            fullWidth
                            label="Your Answer"
                            variant="outlined"
                            value={userAnswer}
                            onChange={handleInputChange}
                            sx={{ mb: 1 }}
                        />
                        <Typography color="primary" sx={{ mb: 2 }}>
                            {answerFeedback}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2 }}>
                        <Button onClick={handlePrev} disabled={currentCardIndex === 0}>
                            Previous
                        </Button>
                        <Button onClick={checkAnswer}>
                            Check
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
