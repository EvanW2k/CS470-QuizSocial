import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import API from '../../API_Interface/API_Interface';  // Adjust the import path as necessary

const QuizzesTable = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {

        const api = new API();
        async function fetchQuizzes () {
            const response = await api.allQuizzes();
            console.log(`data from the DB ${JSON.stringify(response)}`);
            setQuizzes(response.data);
        }

        fetchQuizzes();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Quiz ID</TableCell>
                        <TableCell align="right">User ID</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {quizzes.map((quiz) => (
                        <TableRow
                            key={quiz.quizID}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {quiz.quizID}
                            </TableCell>
                            <TableCell align="right">{quiz.userID}</TableCell>
                            <TableCell align="right">{quiz.title}</TableCell>
                            <TableCell align="right">{quiz.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default QuizzesTable;