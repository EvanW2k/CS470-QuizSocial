import React, {useState, useEffect, Fragment} from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import API from '../../API_Interface/API_Interface'


const FlashCard = () => {
    const quizID = '001'; // Hardcoded quiz ID for testing
    const [cards, setCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isQuestion, setIsQuestion] = useState(true);

    useEffect(() => {
        const api = new API();
        api.getQuestionsForQuiz(quizID)
            .then(data => {
                if (data && data.length > 0) {
                    setCards(data);
                    setCurrentCardIndex(0);
                    setIsQuestion(true);
                } else {
                    console.error('No questions found or empty data returned:', data);
                }
            })
            .catch(error => console.error('Failed to fetch questions:', error));
    }, []);

    const handlePrev = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
            setIsQuestion(true);
        }
    };

    const handleNext = () => {
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setIsQuestion(true);
        }
    };

    const flipCard = () => {
        setIsQuestion(!isQuestion);
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', textAlign: 'center', mt: 4 }}>
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

export default FlashCard;