import {Typography} from '@mui/material';
import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface';
import { useNavigate, Link } from 'react-router-dom';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

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

        if( ! verifyUser || userIdInput.length === 0 || userPassInput.length === 0)
            return;


        const api = new API();
        async function getUserInfo() {
            api.getUserInfo(userIdInput)
                .then( userInfo => {
                    console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                    const loggingUserID = userInfo.user.userID;
                    const userPass = userInfo.user.password;
                    if( userInfo.status === "OK" && userPass === userPassInput) {

                        setUserID(loggingUserID);
                        setVerifyUser(false);
                        navigate(`/profile/${loggingUserID}`)
                    } else  {
                        console.log(`No user exists with id: ${userIdInput}`);
                        setVerifyUser(false);
                        setAuthFailed(true);
                    }
                });
        }

        getUserInfo();
    }, [verifyUser, setUserID, setVerifyUser]);

    return (
        <Fragment>
            <Box display="flex" justifyContent="center" alignItems="center" width="100%" border={0} mt={6}>
                <Typography variant="h4">
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
                    helperText=""
                    onChange={handlePassInputChange}
                />
                <Divider />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {setVerifyUser(true)}}
                >Proceed</Button>
            </Box>

            <Box  display="flex" justifyContent="center" alignItems="center" width="100%" mt={4}>
                <Typography sx={{ fontSize: '14px'}}>
                    Need an account?&nbsp;

                    <Link underline="hover" to={"/register/"}>
                        Register Here
                    </Link>
                </Typography>
            </Box>
        </Fragment>
    )

}