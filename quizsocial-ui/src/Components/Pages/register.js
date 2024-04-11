import {Link, Typography} from '@mui/material';
import React, {useState, useEffect, Fragment} from 'react';
//import API from './API_Interface/API_Interface';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function Login({setUser}) {

    const [userIdInput, setUserIdInput] = useState('');
    const [userPassInput, setUserPassInput] = useState('');
    const [verifyUserExists, setVerifyUserExists] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);

    const [idMSG, setIdMSG] = useState('Must be unique');
    const [passMSG, setPassMSG] = useState('');
    const handleIdInputChange = event => {
        console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserIdInput(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            verifyUserExists(true);
        }
    };

    const handlePassInputChange = event => {
        console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserPassInput(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            verifyUserExists(true);
        }
    };

    // useEffect(() => {
    //
    //     if( ! verifyUser || userInput.length === 0)
    //         return;
    //
    //     const api = new API();
    //     async function getUserInfo() {
    //         api.getUserInfo(userInput)
    //             .then( userInfo => {
    //                 console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
    //                 const user = userInfo.user;
    //                 if( userInfo.status === "OK" ) {
    //                     setUser(user);
    //                 } else  {
    //                     setVerifyUser(false);
    //                     setAuthFailed(true);
    //                 }
    //             });
    //     }
    //
    //     getUserInfo();
    // }, [verifyUser, setUser, userInput]);

    return (
        <Fragment>
            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={10}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Enter new UserID"
                    placeholder=""
                    value={userIdInput}
                    helperText={idMSG}
                    onChange={handleIdInputChange}
                />
                <Divider />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={4}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Enter password"
                    placeholder=""
                    value={userPassInput}
                    helperText={passMSG}
                    onChange={handlePassInputChange}
                />
                <Divider />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={3}>
                <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {setVerifyUserExists(true)}}
                >Create Account</Button>
            </Box>
        </Fragment>
    )

}