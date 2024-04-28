import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import API from '../../API_Interface/API_Interface';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, Fragment } from 'react';


export default function FastMultipleChoice() {

    const navigate = useNavigate();
    const quizID = 2;

    //const { quizID } = useParams();
    const [inGame, setInGame] = useState(false);
    const [cards, setCards] = useState([]);
    const [curCard, setCurCard] = useState(undefined);
    const [gameMSG, setGameMSG] = useState("");

    const [score, setScore] = useState(0);

    const [countdown, setCountdown] = useState(3);
    const [position, setPosition] = useState({ x: 900, y: 0 });
    const [gravitySpeed, setGravitySpeed] = useState(5);
    const [allowMovement, setAllowMovement] = useState(false); // State to allow/disallow movement
    const [aChoices, setAChoices] = useState([]);

    const moveBall = (direction) => {
        if (allowMovement) {
            switch (direction) {
                case 'left':
                    setPosition(prevPosition => ({...prevPosition, x: prevPosition.x - 10}));
                    break;
                case 'right':
                    setPosition(prevPosition => ({...prevPosition, x: prevPosition.x + 10}));
                    break;
                case 'down':
                    setPosition(prevPosition => ({...prevPosition, y: prevPosition.y + 10}));
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
                borderLeft: 1,
                borderRight: 1,
                borderBottom: 1,
                borderWidth: 3
            }}
        >
            <Typography variant="h6" sx={{ textAlign: 'center', margin: 'auto' }}>{answer}</Typography>
        </Box>
    );

    useEffect(() => {
        if (inGame) {
            setScore(0);
            setGravitySpeed(5);
            setPosition({x: 900, y: 0});
            setGravitySpeed(5);
            setScore(0);
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

        let availableCards = remainingCards.filter(card => card.question !== currentCard.question);
        let randomIDX = Math.floor(Math.random() * availableCards.length);

        while (availableCards[randomIDX].answer === currentCard.answer) {
            availableCards = availableCards.slice(0, randomIDX).concat(availableCards.slice(randomIDX + 1));
            randomIDX = Math.floor(Math.random() * availableCards.length);
        }

        if (availableCards.length === 0) {
            fetchQuizzes();
        }

        const randomCard = availableCards[randomIDX];

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

        setAChoices(aChoices);

        setCountdown(3 + Math.round(currentCard.question.length/20))    // ~ 1 more second for every 20 additional characters
        setAllowMovement(false);
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
        moveBall('down');
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
    }, [countdown, allowMovement]);

    // Event listener to handle keyboard inputs
    const handleKeyDown = (event) => {
        if (allowMovement) { // Check if movement is allowed
            switch (event.key) {
                case 'ArrowLeft':
                case 'a':
                    moveBall('left');
                    break;
                case 'ArrowRight':
                case 'd':
                    moveBall('right');
                    break;
                case 'ArrowDown':
                case 's':
                    moveBall('down');
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


    const nextQuestion = () => {
        if (cards.length <= 2) {
            fetchQuizzes();
        }
        else {
            generateRandomChoices(cards[0], cards.slice(1));
            setCurCard(cards[0]);
            setCards(cards.slice(1));
        }

        setPosition({x: 900, y: 0});
        setGravitySpeed(gravitySpeed+1);
        setScore(score+1);

    }
    const handleGuess = (bucket) => {
        if (bucket === 'left' ) {
            if (aChoices[0] === curCard.answer) {
                nextQuestion();
                return;
            }
        }
        if (bucket === 'right' ) {
            if (aChoices[1] === curCard.answer) {
                nextQuestion();
                return;
            }
        }

        setInGame(false);
        setGameMSG(`Game Over`);
    }

    const checkCollision = () => {
        // Define positions and dimensions of buckets
        const leftBucket = { x: 680, width: 200, height: 100 };
        const rightBucket = { x: 950, width: 200, height: 100 };

        const finishLine = 600;

        if (position.y >= finishLine) {
            // Check collision with left bucket
            if (
                position.x >= leftBucket.x &&
                position.x <= leftBucket.x + leftBucket.width
            ) {
                console.log('Collided with LEFT bucket');
                handleGuess('left');
            }

            // Check collision with right bucket
            else if (
                position.x >= rightBucket.x &&
                position.x <= rightBucket.x + rightBucket.width
            ) {
                console.log('Collided with RIGHT bucket');
                handleGuess('right');
            }

            // check if passed finish line
            else {
                setInGame(false);
                setGameMSG(`Game Over`);
            }
        }


    };

    useEffect(() => {
        checkCollision();
    }, [position]);

    if (curCard === undefined && inGame === true){
        return (
            <>Loading...</>
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
                              mt: 2

                          }}
                    >
                        <Typography variant='h4' sx={{ textAlign: 'center' }}>
                            {curCard.question}
                        </Typography>
                            {(!allowMovement) ? (
                                <Grid container direction={'column'}
                                      sx={{
                                          justifyContent: 'center',
                                          alignContent: 'center',
                                          mt: 2

                                      }}>
                                    <Typography variant='h4' mt={5}>
                                        {countdown}
                                    </Typography>
                                </Grid>
                            ) : (
                                <Fragment>
                                    <Grid container direction={'column'}
                                        sx={{
                                            mt: 2
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '30px',
                                                height: '30px',
                                                borderRadius: '50%',
                                                backgroundColor: 'blue',
                                                position: 'relative',
                                                left: `${position.x}px`, // Adjust the multiplier for smoother movement
                                                top: `${position.y}px`, // Adjust the multiplier for smoother movement
                                                transition: 'left 0.3s, top 0.3s', // Smooth transition animation
                                                zIndex: 1
                                            }}
                                        >
                                        </Box>
                                    </Grid>
                                    <>
                                        <Bucket color="green" position={{ x: 680, y: 0 }} answer={aChoices[0]} />
                                        <Bucket color="red" position={{ x: 950, y: 0 }} answer={aChoices[1]} />
                                    </>
                                </Fragment>
                            )
                            }

                    </Grid>
                </Fragment>
            ) : (
                <Grid container direction={'column'}
                      sx={{
                          justifyContent: 'center',
                          alignContent: 'center',
                          mt: 5,

                      }}
                >
                    <Typography variant='h4' sx={{ textAlign: 'center' }}>
                        {gameMSG}
                    </Typography>
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>
                        {gameMSG === "" ? ("") : (`Score: ${score}`)}
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
                            onClick={() => {
                                setInGame(true);
                            }}
                        >
                            {gameMSG === "" ? ("Start Game") : ("Play Again")}
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