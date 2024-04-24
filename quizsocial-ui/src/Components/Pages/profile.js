import {useEffect, useState} from 'react';
import {Typography, IconButton, Paper, Grid, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, FormControl, NativeSelect } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useParams, useNavigate, Link } from 'react-router-dom';
import React from 'react';
import profileDimensions from "../utils/profileDimensions";
import API from '../../API_Interface/API_Interface';

const quizTableComps = ['Quiz', 'Favorites', 'Rating', 'Date Created'];

export default function Profile({loggedInUser}) {

    const navigate = useNavigate();

    const { userID } = useParams();

    const [sortMode, setSortMode] = useState('New');

    const [userInfo, setUserInfo] = useState([]);
    const [userProfileInfo, setUserProfileInfo] = useState([]);
    const [userQuizzes, setUserQuizzes] = useState([]);

    const [isCurrentLoggedUser, setIsCurrentLoggedUser] = useState(false);

    const [followThisUser, setFollowThisUser] = useState(undefined);

    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const handleUnfollow = () => {
        const api = new API();
        async function deleteFollow() {
            try {
                const result = await api.deleteFollowWithIDs(loggedInUser, userID);
                if (result.status === 200) {
                    // Handle success
                    console.log("Follow deleted successfully");
                } else {
                    // Handle failure
                    console.log("Failed to delete follow:", result.data);
                }
            } catch (error) {
                // Handle any errors that occur during the API call
                console.error("Error deleting follow:", error);
            }
        }
        deleteFollow();
        setFollowThisUser(false);
    }

    const handleFollow = () => {

        //  must be logged in to follow people
        if (!loggedInUser) {
            navigate('/login');
        }

        const api = new API();
        async function createFollow() {
            try {
                const result = await api.createFollowWithIDs(loggedInUser, userID);
                if (result.status === 201) {
                    // Handle success
                    console.log("Follow created successfully");
                } else {
                    // Handle failure
                    console.log("Failed to create follow:", result.data);
                }
            } catch (error) {
                // Handle any errors that occur during the API call
                console.error("Error creating follow:", error);
            }
        }
        createFollow();
        setFollowThisUser(true);
    }

    const handleSortChange = event => {
        setSortMode(event.target.value);

        // resort quizzes
        if (sortMode === "Name") {
            return setUserQuizzes([...userQuizzes].sort((a, b) => a.title.localeCompare(b.title)));
        } else if (sortMode === "Favorites") {
            return setUserQuizzes([...userQuizzes].sort((a, b) => b.num_favorites - a.num_favorites));
        } else if (sortMode === "Rating") {
            return setUserQuizzes([...userQuizzes].sort((a, b) => b.rating - a.rating));
        } else if (sortMode === "New") {
            return setUserQuizzes([...userQuizzes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        } else if (sortMode === "Old") {
            return setUserQuizzes([...userQuizzes].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
        } else {
            // Default to sorting by quizName if sortMode is not recognized
            return setUserQuizzes([...userQuizzes].sort((a, b) => a.quizID.localeCompare(b.quizID)));
        }

    }

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

            // only grab this if currently logged in
            if (loggedInUser && loggedInUser !== userID) {
                api.getFollowingByUserID(loggedInUser)
                    .then(userFollowingJSONstring => {
                        console.log(`Logged in user follows: ${JSON.stringify(userFollowingJSONstring)}`);

                        if (userFollowingJSONstring.status === 203) {
                            console.log(userFollowingJSONstring.data);
                            return;
                        }

                        // Filter the array to get rows where followed_id is equal to userId
                        const userFollows = userFollowingJSONstring.data.filter(item => item.followed_id === userID);

                        // Check if there are any elements in the filtered array
                        const followThisUser = userFollows.length > 0;

                        // Set followThisUser state
                        setFollowThisUser(followThisUser);

                    });
            }

            api.getQuizByUserId(userID)
                .then( userQuizzesJSONstring => {
                    console.log(`quizzes: ${JSON.stringify(userQuizzesJSONstring)}`);
                    setUserQuizzes(userQuizzesJSONstring.data);
                });
        }

        getAllUserInfoById();
    }, [userID, followThisUser]);   // if navigating from a profile page to another

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
            <Grid container direction='column' justifyContent="center" alignItems="center">
                {/*Username and bio and picture followers follow button*/}
                <Grid container direction='row' justifyContent="space-between" alignItems="flex-start">
                    {/*Username and bio*/}
                    <Grid
                        container
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
                          direction="row-reverse"
                          border={0}
                          maxWidth={profileDimensions.page.width/2}
                          justifyContent="flex-start"
                          alignItems="center">
                        <Grid container
                              width={profileDimensions.page.width/2 - 350}
                              direction={'column'}
                              border={0}
                              mr={5}
                              justifyContent="flex-start"
                              alignItems="center">
                            <Grid item>
                                <Box
                                    sx={{
                                        border: 1,
                                        width: profileDimensions.picture.width,
                                        height: profileDimensions.picture.height,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {imageError ? (
                                        <Typography fontSize="14px"  color="red" fontWeight="bold" style={{ textAlign: 'center' }}>
                                            Problem with image
                                        </Typography>
                                    ) : (
                                        <img src={userProfileInfo.imageURL}
                                             alt="Profile Picture"
                                             width={128}
                                             height={128}
                                             onError={handleImageError}/>
                                    )}
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box
                                    sx={{
                                        border: 0,
                                        mt: 2
                                    }}
                                >
                                    Followers: {userInfo.num_follows}
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
                                            onClick={handleUnfollow} // Add onClick event handler for unfollow
                                        >
                                            Unfollow
                                        </Button>
                                    ) : (
                                        <Button
                                            sx={{
                                                border: 1,
                                                mt: 2
                                            }}
                                            onClick={handleFollow} // Add onClick event handler for follow
                                        >
                                            Follow
                                        </Button>
                                    )}
                                </Grid>)
                            }
                        </Grid>
                        {isCurrentLoggedUser && (
                            <Grid item
                                  border={0}
                                  alignSelf="flex-start"
                                  justifySelf="center"
                                  alignContent="center"
                                  justifyContent="center"
                            >
                                <IconButton
                                    onClick={() => {
                                        navigate(`/edit-profile/${loggedInUser}`);
                                    }}>
                                    <SettingsIcon/>
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                {/*Create quiz, sort, and quiz table*/}
                <Grid container direction ='column' justifyContent="flex-start" alignItems="flex-start" border={0} mt={3}>
                    <Grid container direction ='row' justifyContent="space-between" alignItems="flex-end" border={0}>
                        <Box border={0}>
                            {isCurrentLoggedUser &&
                                (<Grid item>
                                    <Button
                                        onClick={() => {
                                            navigate(`/createQuiz`)
                                        }}
                                        sx={{
                                            border: 1,
                                            mt: 2
                                        }}>
                                        Create Quiz
                                    </Button>
                                </Grid>)
                            }
                        </Box>
                        <Box border={0}>
                            <Grid item sx={{ justifySelf: 'flex-end', mr: 8, mt: 0}}>
                                <Box sx={{ width: 100, border: 0 }}>
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Sort by
                                        </InputLabel>
                                        <NativeSelect
                                            defaultValue={sortMode}
                                            onChange={handleSortChange}
                                            inputProps={{
                                                name: 'Sort',
                                                id: 'uncontrolled-native',
                                            }}
                                        >
                                            <option value={'New'}>New</option>
                                            <option value={'Favorites'}>Favorites</option>
                                            <option value={'Rating'}>Rating</option>
                                            <option value={'Name'}>Name</option>
                                            <option value={'Old'}>Old</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Box>
                    </Grid>
                    <TableContainer justifyContent="flex-start" alignItems="center">
                        <Table  sx={{maxWidth: profileDimensions.page.width}}>
                            <TableHead>
                                <TableRow>
                                    {
                                      quizTableComps.map((component, idx) => (
                                          component !== "Date Created" ? (
                                            <TableCell align="left" key={idx}>
                                                {component}
                                            </TableCell>
                                          ) : (
                                              <TableCell align="right" key={idx}>
                                                  {component}
                                              </TableCell>
                                          )
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userQuizzes.map((row)=>(
                                    <TableRow key={row.title}
                                              sx={{border: 0}}>
                                        <TableCell align="left"> 
                                            <Link 
                                                under line="hover" 
                                                to={`/quiz/${row.quizID}`} 
                                            >
                                                {row.title}
                                            </Link> 
                                        </TableCell>
                                        <TableCell align="left"> {row.num_favorites} </TableCell>
                                        <TableCell align="left"> {row.rating} </TableCell>
                                        <TableCell align="right"> {row.created_at.split("T")[0]} </TableCell>
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