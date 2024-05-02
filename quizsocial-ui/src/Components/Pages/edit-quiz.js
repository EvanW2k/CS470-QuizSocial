import React, {useState, useEffect, Fragment} from 'react';
import {Typography, Paper, Grid, Button, TextField, Form, Select} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import {InputLabel, FormControl, MenuItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../API_Interface/API_Interface';

export default function EditQuiz(loggedInUser) {
    const navigate = useNavigate();

    const { quizID } = useParams();
    const [isPublic, setIsPublic] = useState(1);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [title, setTitle] = useState('');
    const [quizData, setQuizData] = useState([]);
    const [deleteQuestions, setDeleteQuestions] = useState([]);
    const [addQuestions, setAddQuestions] = useState([]);

    const handlePrivacy = event => {
        setIsPublic(event.target.value);
    };

    const handleQuizNameChange = event => {
        setTitle(event.target.value);
    }

    const handleQuestionChange = event => {
        setQuestion(event.target.value);
    };

    const handleAnswerChange = event => {
        setAnswer(event.target.value);
    };

    const handleAddQuizItem = () => {
        if (question.length > 0 && answer.length > 0) {
            console.log(question, answer);
        }

        setQuizData([...quizData, {question: question, answer: answer}]);
        setAddQuestions([...addQuestions, {question: question, answer: answer}]);

        console.log('added new question and answer');
        console.log(quizData);
        setQuestion('');
        setAnswer('');
        console.log(loggedInUser);
    };

    const handleDeleteQuestion = index => {
        let newQuizData = [...quizData];
        console.log(newQuizData);
        if (newQuizData[index].questionID) {
            console.log("question id exists");
            setDeleteQuestions([...deleteQuestions, newQuizData[index].questionID]);
            console.log(deleteQuestions);
        }
        else {
            console.log("it doesnt");
        }
        newQuizData.splice(index, 1);
        setQuizData(newQuizData);
    };

    const handleSaveChanges = () => {
        console.log("saving changes");

        const api = new API();
        async function removeQuestions() {
            deleteQuestions.map(async (questionID) => {
                console.log(questionID);
                try {
                    await api.deleteQuestion(questionID);
                    console.log(`Question with ID ${questionID} deleted successfully.`);
                } catch (error) {
                    console.error(`Error deleting question with ID ${questionID}:`, error);
                }
            })


        }

        async function updateQuestions() {
            console.log('saving now');
            addQuestions.map(async (qaPair) => {
                console.log(qaPair);
                try {
                    await api.addQuestion(quizID, qaPair.question, qaPair.answer);
                    console.log("successfully added question and answer");
                } catch (error) {
                    console.error("Error adding question and answer", error);
                }
            })
        }

        async function updateQuizInfo() {
            try {
                await api.changeTitle(quizID, title);
                console.log("successfully changed title");
            } catch (error) {
                console.error("Error changing title", error);
            }

            try {
                await api.changePrivacy(quizID, isPublic);
            } catch (error) {
                console.error("Error changing privacy", error);
            }
        }

        removeQuestions();
        updateQuestions();
        updateQuizInfo();
        navigate(`/quiz/${quizID}`);
    };

    useEffect(() => {
        const api = new API();

        async function getQuizInfoById() {
            api.getQuizById(quizID)
                .then( quizInfo => {
                    console.log(`api returns quiz info: ${JSON.stringify(quizInfo)}`);
                    setTitle(quizInfo.data.title);
                    setIsPublic(quizInfo.data.isPublic);
                });
        };

        async function getQuestions() {
            api.getQuestionsForQuiz(quizID)
                .then( questions => {
                    console.log(`api returns questions: ${JSON.stringify(questions)}`);
                    setQuizData(questions.data);
                })
        };

        getQuizInfoById();
        getQuestions();
    }, []);

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
            {/* Container for the whole page */}
            <Grid container direction='column' justifyContent='center' alignItems='flex-start' border={0} marginBottom={2}>
                {/* for quiz name */}
                <Grid container direction='row' justifyContent='center' alignItems='flex-start' border={0} spacing={2} marginBottom={2}>
                    <Grid item>
                        <Typography variant='h4'>
                            Quiz Name:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            id='outlined-basic'
                            variant='outlined'
                            sx={{
                                width:500,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#404E7C',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                }
                            }}
                            value={title}
                            onChange={handleQuizNameChange}
                        />
                    </Grid>
                </Grid>

                {/* setting quiz public/private or delete */}
                <Grid container direction='row' justifyContent='center' alignItems='flex-start' border={0} spacing={2} marginBottom={2}>
                    <Grid container direction='column' justifyContext='center' marginTop={2} maxWidth={500}>
                        <Grid item>
                            <FormControl
                                sx={{
                                    width:200,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#404E7C',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    }
                                }}
                            >
                                <InputLabel id='quiz-privacy' style={{ color: 'white' }}>Privacy</InputLabel>
                                <Select
                                    value={isPublic}
                                    label='Privacy'
                                    onChange={handlePrivacy}


                                >
                                    <MenuItem value={1}>Public</MenuItem>
                                    <MenuItem value={0}>Private</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container direction='column' justifyContext='center' marginTop={2} width={500}>

                    </Grid>
                </Grid>

                {/* for adding quiz questions */}
                <Grid
                    container
                    direction='row'
                    justifyContent='left'
                    alignItems='flex-start'
                    border={0}
                    spacing={2}
                    marginBottom={2}
                >
                    <Grid item justifyContent='left'bottomMargin={2}>
                        <Typography variant='h5'>
                            Add questions:
                        </Typography>
                    </Grid>
                    <Grid container direction='row' justifyContent='center' alignItems='flex-start' border={0} spacing={2} marginBottom={0} marginTop={0}>
                        <Grid item>
                            <Typography variant='h6'>
                                Add question:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                id='outlined-basic'
                                variant='outlined'
                                sx={{
                                    width:500,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#404E7C',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    }
                                }}
                                value={question}
                                onChange={handleQuestionChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent='center' alignItems='flex-start' border={0} spacing={2} marginBottom={2} marginTop={0} >
                        <Grid item mr={1.5}>
                            <Typography variant='h6'>
                                Add answer:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                id='outlined-basic'
                                variant='outlined'
                                sx={{
                                    width:500,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#404E7C',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    }
                                }}
                                value={answer}
                                onChange={handleAnswerChange}
                            />

                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent='center' border={0} spacing={2} marginBottom={5} marginTop={0}>
                        <Button
                            onClick={() => {handleAddQuizItem()}}
                            sx={{
                                border: 0,
                                mt: 2,
                                color:'white',
                                backgroundColor:'#535C91',
                                '&:hover':{
                                    backgroundColor:'#404E7C'
                                }
                            }}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
                {/* container for current quiz questions and answers */}
                <Grid
                    container
                    direction='row'
                    justifyContent='center'
                    alignItems='flex-start'
                    border={0}
                    spacing={2}
                    bottomMargin={2}
                    topMargin={2}
                >
                    <TableContainer
                        component={Paper}
                        sx={{
                            border: '1px solid #404E7C'
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{width: '45%' }}>Question</TableCell>
                                    <TableCell style={{width: '45%' }}>Answer</TableCell>
                                    <TableCell style={{width: '10%' }}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {quizData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.question}</TableCell>
                                        <TableCell>{row.answer}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete" onClick={() => {handleDeleteQuestion(index)}}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* create and delete quiz button */}
                <Grid container direction='row' justifyContent='center' border={0} spacing={2} marginTop={2} marginBottom={2}>
                    <Grid item>
                        <Button
                            onClick={() => handleSaveChanges()}
                            sx={{
                                border: 0,
                                mt: 2,
                                color:'white',
                                backgroundColor:'#535C91',
                                '&:hover':{
                                    backgroundColor:'#404E7C'
                                }
                            }}
                        >
                            Save Changes
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={() => {navigate(`/profile/${loggedInUser.loggedInUser}`)}}
                            sx={{
                                border: 0,
                                mt: 2,
                                color:'white',
                                backgroundColor:'#535C91',
                                '&:hover':{
                                    backgroundColor:'#404E7C'
                                }
                            }}
                        >
                            Discard Changes
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )

}