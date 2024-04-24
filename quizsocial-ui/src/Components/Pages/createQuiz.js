import React, {useState, useEffect, Fragment} from 'react';
import {Typography, Paper, Grid, Button, TextField, Form, Select} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import {InputLabel, FormControl, MenuItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../../API_Interface/API_Interface';

export default function CreateQuiz(loggedInUser) {

    const [isPublic, setIsPublic] = useState(1);
    const data = [{question: 1, answer: 2}];

    const handlePrivacy = event => {
        setIsPublic(event.target.value);
    };

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
                        <TextField id='outlined-basic' label='Quiz Name' variant='outlined' sx={{width:500}} />
                    </Grid>
                </Grid>

                {/* setting quiz public/private or delete */}
                <Grid container direction='row' justifyContent='center' alignItems='flex-start' border={0} spacing={2} marginBottom={2}>
                    <Grid container direction='column' justifyContext='center' marginTop={2} maxWidth={500}>
                        <Grid item>
                            <FormControl sx={{width: 200}}>
                                <InputLabel id='quiz-privacy'>Privacy Setting</InputLabel>
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
                        <Grid item>
                            <Button variant='outlined' sx={{width: 100}}>
                                Delete
                            </Button>
                        </Grid>
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
                            <TextField id='outlined-basic' label='Question' variant='outlined' sx={{width:500}} />
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent='center' alignItems='flex-start' border={0} spacing={2} marginBottom={2} marginTop={0}>
                        <Grid item>
                            <Typography variant='h6'>
                                Add answer:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField id='outlined-basic' label='Answer' variant='outlined' sx={{width:500}} />
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent='center' alignItems='flex-start' border={0} spacing={2} marginBottom={5} marginTop={0}>
                        <Button variant='outlined'>
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
                    border={1}
                    spacing={2}
                    bottomMargin={2}
                    topMargin={2}
                >
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{width: '45%' }}>Question</TableCell>
                                    <TableCell style={{width: '45%' }}>Answer</TableCell>
                                    <TableCell style={{width: '10%' }}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.question}</TableCell>
                                        <TableCell>{row.answer}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                
            </Grid>
        </Paper>
    )

}