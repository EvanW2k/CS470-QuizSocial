import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import API from '../../../API_Interface/API_Interface';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, Fragment } from 'react';


export default function FastMultipleChoice() {

    const navigate = useNavigate();
    const quizID = 2;

    //const { quizID } = useParams();
    const [inGame, setInGame] = useState(true);
    const [cards, setCards] = useState([]);
    const [curCard, setCurCard] = useState(undefined);

    const [countdown, setCountdown] = useState(3); // Initial countdown value
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [gravitySpeed, setGravitySpeed] = useState(5);
    const [allowMovement, setAllowMovement] = useState(false); // State to allow/disallow movement
    const [aChoices, setAChoices] = useState([]);

    const moveBox = (direction) => {
        if (allowMovement) {
            switch (direction) {
                case 'left':
                    setPosition(prevPosition => ({...prevPosition, x: prevPosition.x - 1}));
                    break;
                case 'right':
                    setPosition(prevPosition => ({...prevPosition, x: prevPosition.x + 1}));
                    break;
                case 'down':
                    setPosition(prevPosition => ({...prevPosition, y: prevPosition.y + 1}));
                    break;
                default:
                    break;
            }
        }
    };

    const Bucket = ({ color, position, answer }) => (
        <Box
            sx={{
                width: '200px',
                height: '100px',
                backgroundColor: color,
                position: 'absolute',
                left: `${position.x}px`,
                bottom: `${position.y}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h6" sx={{ textAlign: 'center', margin: 'auto' }}>{answer}</Typography>
        </Box>
    );

    useEffect(() => {
        if (inGame) {
            fetchQuizzes();
        }
    }, [inGame]);

    const fetchQuizzes = async () => {
        const api = new API();
        try {
            const response = await api.getQuestionsForQuiz(quizID);

            if (response.data) {

                const shuffledCards = shuffleArray(response.data);

                setCards(shuffledCards.slice(1));
                setCurCard(shuffledCards[0]);
                generateRandomChoices(shuffledCards[0], shuffledCards.slice(1));
            } else {
                console.error('Not enough quizzes found');
                alert('Not enough questions to fill the board. Please choose a smaller size or add more questions.');
            }
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
        }

    };

    const generateRandomChoices = (currentCard, remainingCards) => {

        const availableCards = remainingCards.filter(card => card.question !== currentCard.question);
        const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
        console.log("!!!",availableCards)

        const correctAnswerIndex = Math.floor(Math.random() * 2); // 0 or 1
        const incorrectAnswerIndex = 1 - correctAnswerIndex; // Ensure the other index is selected

        const choices = [
            currentCard.answer, // Correct answer
            randomCard.answer[Math.floor(Math.random() * randomCard.answer.length)] // Incorrect answer
        ];

        const aChoices = [
            choices[correctAnswerIndex],
            choices[incorrectAnswerIndex]
        ];

        console.log(aChoices)

        setAChoices(aChoices);
    };

    const shuffleArray = array => {
        // Loop through the array starting from the last element
        for (let i = array.length - 1; i > 0; i--) {
            // Generate a random index between 0 and i (inclusive)
            const j = Math.floor(Math.random() * (i + 1));
            // Swap the elements at positions i and j
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array; // Return the shuffled array
    };


    const applyGravity = () => {
        moveBox('down');
    };

    // Function to handle countdown
    const handleCountdown = () => {
        setCountdown(prevCountdown => prevCountdown - 1);
    };

    // Effect to handle countdown
    useEffect(() => {
        if (countdown > 0) {
            const countdownInterval = setInterval(handleCountdown, 1000);
            return () => clearInterval(countdownInterval); // Cleanup on component unmount
        } else {
            setAllowMovement(true);
            const gravityInterval = setInterval(applyGravity, 1000 / gravitySpeed);
            return () => clearInterval(gravityInterval); // Cleanup on component unmount
        }
    }, [countdown, gravitySpeed, allowMovement]);

    // Event listener to handle keyboard inputs
    const handleKeyDown = (event) => {
        if (allowMovement) { // Check if movement is allowed
            switch (event.key) {
                case 'ArrowLeft':
                    moveBox('left');
                    break;
                case 'ArrowRight':
                    moveBox('right');
                    break;
                case 'ArrowDown':
                    moveBox('down');
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [allowMovement]); // Add allowMovement to dependency array to update effect when it changes


    if (curCard === undefined){
        return (
            <></>
        )
    }

    return (
        <Grid container
              sx={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  mt: 2

              }}>
            <Typography variant='h4'>
                Fast Multiple Choice
            </Typography>
            <hr
                style={{
                    color: 'black',
                    backgroundColor: 'black',
                    width: '100%',
                }}
            />
            {inGame ? (
                <Fragment>
                    <Grid container direction={'column'}
                          sx={{
                              justifyContent: 'center',
                              alignContent: 'center',
                              mt: 2

                          }}
                    >
                        <Typography variant='h4' sx={{ textAlign: 'center' }}>
                            {curCard.question}
                        </Typography>
                        <Grid container direction={'column'}
                              sx={{
                                  justifyContent: 'center',
                                  alignContent: 'center',
                                  mt: 2

                              }}>
                            {countdown > 0 ? (
                                <Typography variant='h4' mt={5}>
                                    {countdown}
                                </Typography>
                            ) : (
                                <Box
                                    sx={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        backgroundColor: 'blue',
                                        position: 'relative',
                                        left: `${position.x * 10}px`, // Adjust the multiplier for smoother movement
                                        top: `${position.y * 10}px`, // Adjust the multiplier for smoother movement
                                        transition: 'left 0.3s, top 0.3s', // Smooth transition animation
                                    }}
                                >
                                </Box>
                            )
                            }
                        </Grid>
                    </Grid>
                    {allowMovement && (
                        <>
                            <Bucket color="green" position={{ x: 680, y: 0 }} answer={aChoices[0]} />
                            <Bucket color="red" position={{ x: 950, y: 0 }} answer={aChoices[1]} />
                        </>
                    )}
                </Fragment>
            ) : (
                <Grid container
                      sx={{
                          justifyContent: 'center',
                          alignContent: 'center',
                          mt: 5,

                      }}
                >
                    <Typography variant='h5'>
                        Play again?
                    </Typography>
                    <Grid container direction={'row'}
                          sx={{
                              justifyContent: 'center',
                              alignContent: 'center',
                              mt: 5,
                              flexGrow: 1,
                          }}>
                        <Button
                            sx={{
                                border: 1,
                                mr: 2
                            }}

                        >
                            Play again
                        </Button>
                        <Button
                            sx={{
                                border: 1,
                                ml: 2
                            }}
                            onClick={() => {
                                navigate(`/quiz/${quizID}`)
                            }}
                        >
                            Quiz page
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Grid>
    )
}