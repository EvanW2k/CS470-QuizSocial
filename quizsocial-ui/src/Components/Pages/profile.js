import {useEffect, useState} from 'react';
import {Typography, Paper, Grid, Box, Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, FormControl, NativeSelect } from '@mui/material';
import { useParams } from 'react-router-dom';
import React from 'react';
import profileDimensions from "../utils/profileDimensions";
import API from '../../API_Interface/API_Interface';

const quizTableComps = ['Quiz', 'Favorites', 'Date Created'];

export default function Profile({loggedInUser}) {

    const { userID } = useParams();

    const [sortMode, setSortMode] = useState('New');

    const [userInfo, setUserInfo] = useState([]);
    const [userProfileInfo, setUserProfileInfo] = useState([]);
    const [follows, setFollows] = useState(0);
    const [userQuizzes, setUserQuizzes] = useState([]);

    const [isCurrentLoggedUser, setIsCurrentLoggedUser] = useState(false);


    const quizzes = [{name: 'quiz 1', favorites: 4, date: '2024-10-4'}, {name: 'quiz 2', favorites: 1, date: '2024-10-8'}, {name: 'quiz 3', favorites: 43, date: '2024-4-2'}];
    const followThisUser = false;

    useEffect(() => {

        const api = new API();
        async function getAllUserInfoById() {

            userID === loggedInUser ? setIsCurrentLoggedUser(true) : setIsCurrentLoggedUser(false);

            api.getUserById(userID)
                .then( userJSONstring => {
                    console.log(`api returns user INFO and it is: ${JSON.stringify(userJSONstring)}`);
                    setUserInfo(userJSONstring.data);
                });
            api.getUserProfileById(userID)
                .then( userProfileJSONstring => {
                    console.log(`api returns user PROFILE INFO and it is: ${JSON.stringify(userProfileJSONstring)}`);
                    setUserProfileInfo(userProfileJSONstring.data);
                });
            api.getFollowsById(userID)
                .then( followCountJSONstring => {
                    console.log(`api returns user follows and it is: ${JSON.stringify(followCountJSONstring)}`);
                    setFollows(followCountJSONstring.data.count);
                });
            api.getQuizByUserId(userID)
                .then( userQuizzesJSONstring => {
                    console.log(`quizzes: ${JSON.stringify(userQuizzesJSONstring)}`);
                    setUserQuizzes(userQuizzesJSONstring.data);
                });
        }

        getAllUserInfoById();
    }, []);

    if (!userInfo || !userProfileInfo)
        return;

    return (
        <Paper
            sx={{
                p: 3,
                margin: 'auto',
                mt: 3,
                justifycontent: 'center',
                alignItems: 'flex-start',
                maxWidth: profileDimensions.page.width,
                flexGrow: 1,
                border: 0
            }}
        >
            <Grid container direction ='column' justifyContent="center" alignItems="center">
                {/*Username and bio and picture followers follow button*/}
                <Grid container direction='row' justifyContent="space-between" alignItems="flex-start">
                    {/*Username and bio*/}
                    <Grid
                        direction={'column'}
                        border={0}
                        maxWidth={profileDimensions.page.width/2}
                        flexGrow={1}
                    >
                        <Grid item sx={{ml: 2}} border={0}>
                            <Typography sx={{ fontSize: '24px', fontWeight: 'bold', cursor: 'auto'}}>
                                {userInfo.username}
                            </Typography>
                        </Grid>
                        <Grid item sx={{ml: 2, mt: 2}} border={0} >
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', wordBreak: "break-word", cursor: 'auto'}}>
                                {userProfileInfo.bio}
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
                <Grid container direction ='column' justifyContent="flex-start" alignItems="flex-start" border={0} mt={3}>
                    <Grid container direction ='row' justifyContent="space-between" alignItems="flex-end" border={0}>
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
                        <Grid item sx={{ alignSelf: 'flex-end', mr: 8, mt: 0 }}>
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
                                {userQuizzes.map((row)=>(
                                    <TableRow key={row.title}
                                              sx={{border: 0 }}>
                                        <TableCell align="left"> <Link underline="hover" href={"/quiz/" + row.quizID}>{row.title}</Link> </TableCell>
                                        <TableCell align="left"> {0} </TableCell>
                                        <TableCell align="left"> {row.created_at} </TableCell>
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