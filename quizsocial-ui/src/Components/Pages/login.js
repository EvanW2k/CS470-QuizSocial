import {Typography, Paper} from '@mui/material';
import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface';
import { useNavigate, Link } from 'react-router-dom';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import profileDimensions from "../utils/profileDimensions";

export default function Login({setUserID}) {

    const navigate = useNavigate();

    const [userIdInput, setUserIdInput] = useState('');
    const [userPassInput, setUserPassInput] = useState('');
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);
    const handleIdInputChange = event => {
        console.log("handleIdInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserIdInput(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    const handlePassInputChange = event => {
        console.log("handlePassInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserPassInput(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    useEffect(() => {

        console.log("Trying Authentication")

        if( ! verifyUser || userIdInput.length === 0 || userPassInput.length === 0) {
            setVerifyUser(false);
            return;
        }

        const api = new API();
        async function getUserInfo() {
            api.getUserInfo(userIdInput)
                .then( userInfo => {
                    console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                    if( userInfo.status === "OK") {

                        const userPass = userInfo.user.password;
                        // pass check
                        if (userPass === userPassInput) {
                            const loggingUserID = userInfo.user.userID;
                            setUserID(loggingUserID);
                            setVerifyUser(false);
                            navigate(`/profile/${loggingUserID}`)
                            return;
                        }
                    }

                    console.log(`Incorrect user id or password`);
                    setVerifyUser(false);
                    setAuthFailed(true);

                });
        }

        getUserInfo();
    }, [verifyUser, setUserID, setVerifyUser]);

    return (
        <Fragment>
            <Paper sx={{
                p: 3,
                margin: 'auto',
                mt: 3,
                justifyContent: 'center',
                alignItems: 'flex-start',
                maxWidth: profileDimensions.page.width/3,
                flexGrow: 1,
                border: 0,
                backgroundColor: 'white'
            }}>
                <Box display="flex" justifyContent="center"  alignItems="center" width="100%" border={0} mt={1}>
                    <Typography variant="h4" color="black">
                        Login
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={4}>

                    <TextField
                        error={authFailed}
                        id="outlined-error-helper-text"
                        label="UserID"
                        placeholder=""
                        value={userIdInput}
                        helperText="Only for existing users!"
                        onChange={handleIdInputChange}
                        sx={{
                            '& .MuiInputBase-input': {
                                backgroundColor: '#FFFFFF',
                                color: '#000000',
                            },
                            '& .MuiInputLabel-root': {
                                color: '#000000',
                            },
                            '& .MuiFormHelperText-root': {
                                color: '#000000',
                            },
                        }}
                    />
                    <Divider />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={3}>

                    <TextField
                        error={authFailed}
                        id="outlined-error-helper-text"
                        label="Password"
                        placeholder=""
                        value={userPassInput}
                        type="password"
                        helperText={authFailed ? "Incorrect UserID or Password" : ""}
                        onChange={handlePassInputChange}
                        sx={{
                            '& .MuiInputBase-input': {
                                backgroundColor: '#FFFFFF',
                                color: '#000000',
                            },
                            '& .MuiInputLabel-root': {
                                color: '#000000',
                            },
                            '& .MuiFormHelperText-root': {
                                color: '#000000',
                            },
                        }}
                    />
                    <Divider />
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={3}>
                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={() => {setVerifyUser(true)}}
                        style={{
                            color: 'white', // Text color
                            backgroundColor: '#1B1A55', // Background color
                        }}
                    >Proceed</Button>
                </Box>

                <Box  display="flex" justifyContent="center" alignItems="center" width="100%" mt={4}>
                    <Typography sx={{ fontSize: '14px'}} color="black">
                        Need an account?&nbsp;

                        <Link underline="hover" to={"/register/"}>
                            Register Here
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Fragment>
    )

}