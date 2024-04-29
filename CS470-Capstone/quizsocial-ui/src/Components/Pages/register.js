import {Link, Typography} from '@mui/material';
import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface';

import { useNavigate} from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function Register({setUser}) {

    const navigate = useNavigate();

    const [userIdInput, setUserIdInput] = useState('');
    const [userPassInput, setUserPassInput] = useState('');
    const [userPassConfirmInput, setUserPassConfirmInput] = useState('');

    const [userInputError, setUserInputError] = useState(true);
    const [authFailed, setAuthFailed] = useState(false);

    const [idMSG, setIdMSG] = useState('Must be unique');
    const [passMSG, setPassMSG] = useState('Passwords don\'t match');

    function containsInvalidCharacters(str) {
        // Regular expression pattern to match characters not in the specified set
        var pattern = /[^A-Za-z0-9\-_\.]/;

        // Test the string against the pattern
        return pattern.test(str);
    }
    const handleIdInputChange = event => {
        console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserIdInput(event.target.value);
        setAuthFailed(false);
        setUserInputError(false);

        setIdMSG('Must be unique');


        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setUserInputError(false);
        }
    };

    const handlePassInputChange = event => {
        console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserPassInput(event.target.value);
        setUserPassConfirmInput('');

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setUserInputError(false);
        }
    };

    const handlePassConfirmInputChange = event => {
        console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserPassConfirmInput(event.target.value);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setUserInputError(false);
        }
    };

    useEffect(() => {

        if(userIdInput.length === 0 || userPassInput === 0)
            return;

        if (containsInvalidCharacters(userIdInput)) {
            setIdMSG("Valid characters: [ A-Z  a-z  0-9  _  -  . ]")
            setAuthFailed(true);
            return;
        }

        const api = new API();
        async function checkID() {
            api.getUserInfo(userIdInput)
                .then( userInfo => {
                    console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                    if( userInfo.status !== "OK" ) {
                        setAuthFailed(false);
                    } else {
                        setAuthFailed(true);
                    }
                });

        }

        checkID();
    }, [userIdInput]);

    const handleCreateButton = () => {
        if(
            userIdInput.length === 0 ||
            userPassInput.length === 0 ||
            authFailed ||
            userPassInput !== userPassConfirmInput ||
            userInputError
        ) {
            console.log("Current registration info is invalid",
                userIdInput.length === 0,
                userPassInput.length === 0,
                authFailed,
                userPassInput !== userPassConfirmInput,
                userInputError
                );
            setUserInputError(true)
            return;
        }

        const api = new API();
        async function CreateUser() {
            try {
                const result = await api.createUserByIdAndPass(userIdInput, userPassInput);
                console.log(`API result:`, result);
                // Check if the response is successful (status code 200)
                if (result.status === 200) {
                    // Handle success
                    console.log("User created successfully");
                    navigate(`/login`);
                } else {
                    // Handle failure
                    console.log("Failed to create user:", result.data);
                }
            } catch (error) {
                // Handle any errors that occur during the API call
                console.error("Error creating user:", error);
            }
        }

        CreateUser();
    }


    return (
        <Fragment>
            <Box display="flex" justifyContent="center" alignItems="center" width="100%" border={0} mt={6}>
                <Typography variant="h4">
                    Register
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={4}>

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
                    error={false}
                    id="outlined-error-helper-text"
                    label="Enter password"
                    placeholder=""
                    type="password"
                    value={userPassInput}
                    helperText={''}
                    onChange={handlePassInputChange}
                />
                <Divider />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                <TextField
                    error={userPassInput !== userPassConfirmInput}
                    id="outlined-error-helper-text"
                    label="Confirm password"
                    placeholder=""
                    type="password"
                    value={userPassConfirmInput}
                    helperText={userPassInput !== userPassConfirmInput ? passMSG: ""}
                    onChange={handlePassConfirmInputChange}
                />
                <Divider />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={3}>
                <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {handleCreateButton()}}
                >Create Account</Button>
            </Box>
        </Fragment>
    )

}