import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import API from '../../../API_Interface/API_Interface';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, Fragment } from 'react';


export default function FastMultipleChoice() {

    const { quizID } = useParams();

    const finishLine = 800;

    const bucketWidth = 300;
    const bucketHeight = 150;
    const leftBucketPos_x = window.innerWidth/2 - bucketWidth - 50;
    const rightBucketPos_x = window.innerWidth/2 + 50;
    const bucketPos_y = 675;

    const ballDiameter = 30;
    const ballStartPos_x = window.innerWidth/2 - ballDiameter/2;
    const ballStartPos_y = window.innerHeight/4;

    const baseFontSize = 25;
    const minFontSize = 2;
    const maxAnswerLength = 250;

    const charsForExtraSec = 25;


    const navigate = useNavigate();

    const [inGame, setInGame] = useState(false);
    const [cards, setCards] = useState(undefined);
    const [gameMSG, setGameMSG] = useState("Use ASD or arrow keys to move the ball.");

    const [cardQueue, setCardQueue] = useState([]);
    const [curCard, setCurCard] = useState(undefined);
    const [score, setScore] = useState(0);


    const [lastKeyDownTime, setLastKeyDownTime] = useState(0);
    const [position, setPosition] = useState({ x: ballStartPos_x, y: ballStartPos_y });



    const [countdown, setCountdown] = useState(3);

    const [gravitySpeed, setGravitySpeed] = useState(5);
    const [allowMovement, setAllowMovement] = useState(false); // State to allow/disallow movement
    const [aChoices, setAChoices] = useState([]);


    const moveBall = (direction) => {
        if (allowMovement) {
            switch (direction) {
                case 'left':
                    setPosition(prevPosition => ({...prevPosition, x: prevPosition.x - 15}));
                    break;
                case 'right':
                    setPosition(prevPosition => ({...prevPosition, x: prevPosition.x + 15}));
                    break;
                case 'down':
                    setPosition(prevPosition => ({...prevPosition, y: prevPosition.y + 50}));
                    break;
                default:
                    break;
            }
        }
    };

    const Bucket = ({ color, position, answer }) => {

        const fontSizeRatio = answer.length / maxAnswerLength;
        const fontSize = Math.max(baseFontSize * (1-fontSizeRatio), minFontSize);

        return (
            <Box
                sx={{
                    width: `${bucketWidth}px`,
                    height: `${bucketHeight}px`,
                    backgroundColor: color,
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    display: 'flex',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottom: 1,
                    borderWidth: 3
                }}
            >
                <Typography sx={{fontSize: `${fontSize}px`, textAlign: 'center', margin: 'auto'}}>{answer}</Typography>
            </Box>
        );

    }


    useEffect(() => {
        if (!cards)
            fetchQuizzes();
        else {
            const shuffledCards = shuffleArray(cards);
            setCardQueue(shuffledCards.slice(1));
            setCurCard(shuffledCards[0]);
            generateRandomChoices(shuffledCards[0], shuffledCards);
        }

        setAllowMovement(false);
        setScore(0);
        setGravitySpeed(5);
        setPosition({x: ballStartPos_x, y: ballStartPos_y});
        setGravitySpeed(5);
        setScore(0);


    }, [inGame]);

    const fetchQuizzes = async () => {
        const api = new API();
        try {
            const response = await api.getQuestionsForQuiz(quizID);

            if (response.data) {

                console.log(response.data);

                setCards(response.data);

                const shuffledCards = shuffleArray(response.data);
                setCardQueue(shuffledCards.slice(1));
                setCurCard(shuffledCards[0]);
                generateRandomChoices(shuffledCards[0], shuffledCards);

            } else {
                console.error('Not enough quizzes found');
                alert('Not enough questions to fill the board. Please choose a smaller size or add more questions.');
            }
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
        }

    };

    const generateRandomChoices = (currentCard, allCards) => {

        let availableCards = allCards.filter(card => card.answer !== currentCard.answer);
        const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];

        const correctAnswerIndex = Math.floor(Math.random() * 2); // 0 or 1
        const incorrectAnswerIndex = 1 - correctAnswerIndex; // Ensure the other index is selected

        const choices = [
            currentCard.answer, // Correct answer
            randomCard.answer // Incorrect answer
        ];

        const aChoices = [
            choices[correctAnswerIndex],
            choices[incorrectAnswerIndex]
        ];

        setAChoices(aChoices);

        setCountdown(3 + Math.round(currentCard.question.length/charsForExtraSec))    // ~ 1 more second for every 20 additional characters
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
        setPosition(prevPosition => ({...prevPosition, y: prevPosition.y + 10}));
    };

    // Function to handle countdown
    const handleCountdown = () => {
        setCountdown(prevCountdown => prevCountdown - 1);
    };

    // Effect to handle countdown
    useEffect(() => {
        if (inGame && countdown !== undefined){
            if (countdown > 0) {
                const countdownInterval = setInterval(handleCountdown, 1000);
                return () => clearInterval(countdownInterval); // Cleanup on component unmount
            } else {
                setAllowMovement(true);
                const gravityInterval = setInterval(applyGravity, 1000 / gravitySpeed);
                return () => clearInterval(gravityInterval); // Cleanup on component unmount
            }
        }
    }, [countdown, allowMovement, inGame]);

    // Event listener to handle keyboard inputs
    const handleKeyDownWithDebounce = (event) => {
        if (allowMovement) { // Check if movement is allowed
            const now = new Date().getTime();
            if (now - lastKeyDownTime >= 100) { // Only allow input every 0.1 seconds
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
                setLastKeyDownTime(now);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDownWithDebounce);
        return () => {
            window.removeEventListener('keydown', handleKeyDownWithDebounce);
        };
    }, [allowMovement, lastKeyDownTime]); // Add allowMovement to dependency array to update effect when it changes


    const nextQuestion = () => {

        const shuffled = cardQueue.length === 0 ? shuffleArray(cards) : cardQueue;

        setCardQueue(shuffled.slice(1));
        generateRandomChoices(shuffled[0], cards);
        setCurCard(shuffled[0]);
        setCardQueue(shuffled.slice(1));

        console.log('!!!', cardQueue);

        setPosition({x: ballStartPos_x, y: ballStartPos_y});
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
        const leftBucket = { x: leftBucketPos_x, width: bucketWidth, height: bucketHeight };
        const rightBucket = { x: rightBucketPos_x, width: bucketWidth, height: bucketHeight };


        if (position.y >= finishLine) {
            // Check collision with left bucket
            if (
                position.x + ballDiameter/2 >= leftBucket.x &&
                position.x + ballDiameter/2 <= leftBucket.x + leftBucket.width
            ) {
                console.log('Collided with LEFT bucket');
                handleGuess('left');
            }

            // Check collision with right bucket
            else if (
                position.x + ballDiameter/2 >= rightBucket.x &&
                position.x + ballDiameter/2 <= rightBucket.x + rightBucket.width
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
                            <Grid item
                                  sx={{
                                      justifyContent: 'center',
                                      alignContent: 'center',
                                      mt: 2

                                  }}>
                                <Typography variant='h4' mt={3} sx={{ textAlign: 'center' }}>
                                    {countdown}
                                </Typography>
                            </Grid>
                        ) : (
                            <Fragment>
                                <Grid container direction="column"
                                      sx={{ mt: 2,
                                          border: 0,
                                          width: '100%',
                                          height: '500px',
                                          justifyContent: 'center'
                                      }}
                                >
                                    {/* Ball */}
                                    <Grid item>
                                        <Box
                                            sx={{
                                                width: `${ballDiameter}px`,
                                                height: `${ballDiameter}px`,
                                                borderRadius: '50%',
                                                backgroundColor: 'blue',
                                                position: 'absolute',
                                                left: `${position.x}px`,
                                                top: `${position.y}px`,
                                                zIndex: 1,
                                                transition: 'left 0.05s Ease-out, top 0.05s Ease-out'
                                            }}
                                        />
                                    </Grid>
                                    {/* Boxes */}
                                    <Grid item container direction="row"
                                          sx={{
                                              border: 0,
                                              borderColor: 'red',
                                              height: bucketHeight
                                          }}
                                    >
                                        <Grid item border={0}>
                                            <Bucket color="lightgreen" position={{ x: leftBucketPos_x, y: bucketPos_y }} answer={aChoices[0]} />
                                        </Grid>
                                        <Grid item border={0}>
                                            <Bucket color="lightblue" position={{ x: rightBucketPos_x, y: bucketPos_y }} answer={aChoices[1]} />
                                        </Grid>
                                    </Grid>
                                </Grid>
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
                        {gameMSG !== "Game Over" ? ("") : (`Score: ${score}`)}
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
                            {gameMSG !== "Game Over" ? ("Start Game") : ("Play Again")}
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