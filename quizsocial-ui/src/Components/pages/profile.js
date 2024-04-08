import {useEffect, useState} from 'react';
import {Typography, Paper, Grid, Box, Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, FormControl, NativeSelect } from '@mui/material';
import { useParams } from 'react-router-dom';

import profileDimensions from "../utils/profileDimensions";

const quizTableComps = ['Quiz', 'Favorites', 'Date Created'];

export default function Main() {

    const { userID } = useParams();

    const [sortMode, setSortMode] = useState('New');

    const quizzes = [{name: 'quiz 1', favorites: 4, date: '2024-10-4'}, {name: 'quiz 2', favorites: 1, date: '2024-10-8'}, {name: 'quiz 3', favorites: 43, date: '2024-4-2'}];
    const bio = "Hello my name is Evan. I am a cs major currently taking 470, 460, 355, 390, and 385. TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TESTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTT TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST TESTffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
    const userName = "Evan_Walters";
    const isCurrentLoggedUser = false;
    const followThisUser = true;
    const follows = 22;


    useEffect(() => {
        // do an api query for all userid info
    }, []);

    return (
        <Paper
            sx={{
                p: 3,
                margin: 'auto',
                mt: 3,
                justifyContent: 'center',
                alignItems: 'flex-start',
                maxWidth: profileDimensions.page.width,
                flexGrow: 1,
                border: 0
            }}
        >
            <Grid container direction ='column' justifyContent="center" alignItems="flex-start">
                {/*Username and bio and picture followers follow button*/}
                <Grid container direction='row' justifyContent="center" alignItems="flex-start">
                    {/*Username and bio*/}
                    <Grid
                        direction={'column'}
                        border={0}
                        maxWidth={profileDimensions.page.width/2}
                        flexGrow={1}
                    >
                        <Grid item sx={{ml: 2}} border={0}>
                            <Typography sx={{ fontSize: '24px', fontWeight: 'bold', cursor: 'auto'}}>
                                {userName}
                            </Typography>
                        </Grid>
                        <Grid item sx={{ml: 2, mt: 2}} border={0} >
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', wordBreak: "break-word", cursor: 'auto'}}>
                                {bio}
                            </Typography>
                        </Grid>
                    </Grid>
                    {/*picture follows and follow button*/}
                    <Grid container
                          spacing={2}
                          direction={'column'}
                          border={0}
                          maxWidth={profileDimensions.page.width/2}
                          justifyContent="flex-start"
                          alignItems="center">
                        <Grid item>
                            <Box
                                sx={{
                                    border: 1,
                                    width: profileDimensions.picture.width,
                                    height: profileDimensions.picture.height
                                }}
                            >
                                Picture
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box
                                sx={{
                                    border: 0,
                                    mt: 2
                                }}
                            >
                                Followers: {follows}
                            </Box>
                        </Grid>
                        {!isCurrentLoggedUser &&
                            (<Grid item>
                                {followThisUser ? (
                                    <Button
                                        sx={{
                                            border: 1,
                                            mt: 2
                                        }}
                                    >
                                        Unfollow
                                    </Button>
                                ) : (
                                    <Button
                                        sx={{
                                            border: 1,
                                            mt: 2
                                        }}
                                    >
                                        Follow
                                    </Button>
                                )}
                            </Grid>)
                        }
                    </Grid>
                </Grid>
                {/*Create quiz, sort, and quiz table*/}
                <Grid container direction ='column' justifyContent="flex-start" alignItems="center" border={0}>
                    {isCurrentLoggedUser &&
                        (<Grid item>
                            <Button
                                sx={{
                                border: 1,
                                mt: 2
                            }}>
                                Create Quiz
                            </Button>
                        </Grid>)
                    }
                    <Grid item sx={{ alignSelf: 'flex-end', mr: 7, mt: 2 }}>
                        <Box sx={{ width: 100, border: 0 }}>
                            <FormControl fullWidth>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    Sort by
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={sortMode}
                                    onChange={(event) => setSortMode(event.target.value)}
                                    inputProps={{
                                        name: 'Sort',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={'New'}>New</option>
                                    <option value={'Favorites'}>Favorites</option>
                                    <option value={'Date'}>Date</option>
                                    <option value={'Name'}>Name</option>
                                </NativeSelect>
                            </FormControl>
                        </Box>
                    </Grid>
                    <TableContainer justifyContent="flex-start" alignItems="center">
                        <Table  sx={{maxWidth: profileDimensions.page.width}}>
                            <TableHead>
                                <TableRow>
                                    {
                                      quizTableComps.map((component) => (
                                        <TableCell align="left">
                                            {component}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {quizzes.map((row)=>(
                                    <TableRow key={row.name}
                                              sx={{border: 0 }}>
                                        <TableCell align="left"> <Link underline="hover" href={"/quiz/" + row.name.replace(/\s/g, "")}>{row.name}</Link> </TableCell>
                                        <TableCell align="left"> {row.favorites} </TableCell>
                                        <TableCell align="left"> {row.date} </TableCell>
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