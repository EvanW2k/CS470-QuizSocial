import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';

const FlashCard = () => {
    // Hardcoded data for testing
    const cards = [
        {
            question: "What is the capital of France?",
            answer: "Paris"
        },
        {
            question: "What is the largest planet in our solar system?",
            answer: "Jupiter"
        },
        {
            question: "What year did the Titanic sink?",
            answer: "1912"
        }
    ];

    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isQuestion, setIsQuestion] = useState(true);

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
            {cards.length === 0 && <Typography>No cards available.</Typography>}
        </Box>
    );
};

export default FlashCard;
