import API from '../../../API_Interface/API_Interface';
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function FillingTheBlank(props) {
    const { quizID } = useParams();
    const [cards, setCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [answerFeedback, setAnswerFeedback] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        const fetchQuizzes = async () => {
            const api = new API();
            try {
                const response = await api.getQuestionsForQuiz(quizID);
                if (response.data && response.data.length > 0) {
                    setCards(shuffleArray(response.data));
                } else {
                    console.log('No quizzes found');
                }
            } catch (error) {
                console.error('Failed to fetch quizzes:', error);
            }
        };

        fetchQuizzes();
    }, [quizID]);

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handlePrev = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
            setAnswerFeedback('');
            setUserAnswer('');
            setShowAnswer(false);
        }
    };

    const handleNext = () => {
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setAnswerFeedback('');
            setUserAnswer('');
            setShowAnswer(false);
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

    const viewAnswer = () => {
        setShowAnswer(prev => !prev);
    };

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', textAlign: 'center', mt: 4 }}>
            {cards.length > 0 && (
                <Card variant="outlined" sx={{ mb: 2, p: 3 }}>
                    <CardContent>
                        <Typography variant="h5" sx={{ fontSize: 22, mb: 2 }}>
                            Question:
                        </Typography>
                        <Typography sx={{ fontSize: 20, mb: 2 }}>
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
                        <Typography variant="h6" sx={{ color: answerFeedback === 'Correct!' ? 'green' : 'red', mb: 2 }}>
                            {answerFeedback}
                        </Typography>
                        {showAnswer && (
                            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                                Correct Answer: {cards[currentCardIndex].answer}
                            </Typography>
                        )}
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2 }}>
                        <Button onClick={handlePrev} disabled={currentCardIndex === 0}
                                sx={{
                                    border: 0,
                                    mr: 2,
                                    color:'white',
                                    backgroundColor:'#535C91',
                                    '&:hover':{
                                        backgroundColor:'#404E7C'
                                    }
                                }}>
                            Previous
                        </Button>
                        <Button onClick={checkAnswer}
                                sx={{
                                    border: 0,
                                    mr: 2,
                                    color:'white',
                                    backgroundColor:'#535C91',
                                    '&:hover':{
                                        backgroundColor:'#404E7C'
                                    }
                                }}>
                            Check
                        </Button>
                        <Button onClick={viewAnswer}
                                sx={{
                                    border: 0,
                                    mr: 2,
                                    color:'white',
                                    backgroundColor:'#4071F4',
                                    '&:hover':{
                                        backgroundColor:'#3051D3'
                                    }
                                }}>
                            {showAnswer ? 'Hide Answer' : 'View Answer'}
                        </Button>
                        <Button onClick={handleNext} disabled={currentCardIndex === cards.length - 1}
                                sx={{
                                    border: 0,
                                    color:'white',
                                    backgroundColor:'#535C91',
                                    '&:hover':{
                                        backgroundColor:'#404E7C'
                                    }
                                }}
                        >
                            Next
                        </Button>
                    </Box>
                </Card>
            )}
            {cards.length === 0 && <Typography variant="h6" sx={{ mt: 2 }}>No cards available for this quiz.</Typography>}
        </Box>
    );
};
