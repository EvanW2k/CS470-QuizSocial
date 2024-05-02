import {useEffect, useState} from 'react';
import API from "../../API_Interface/API_Interface";
import React from 'react';
import {Typography, Grid, Button, Paper, Input, InputLabel} from "@mui/material";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import profileDimensions from "../utils/profileDimensions";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

import { useNavigate, Link } from 'react-router-dom';

const maxNameSize = 25;
const maxBioSize = 500;

export default function EditProfile ({loggedInUser}) {

    console.assert(loggedInUser);   // assert that there is a logged in user

    const navigate = useNavigate();

    const [userNameField, setUserNameField] = useState('');
    const [bioField, setBioField] = useState('');
    const [pictureField, setPictureField] = useState('Picture');
    const [colorField, setColorField] = useState('blue');   // for color of the users profile


    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    useEffect(() => {
        // Reset imageError state when pictureField changes
        setImageError(false);
    }, [pictureField]);

    const handleUserNameChange = event => {
        console.log("handleUserNameChange called.");

        setUserNameField(event.target.value);
    }

    const handleBioChange = event => {
        console.log("handleBioChange called.");

        setBioField(event.target.value);

    };

    const handleImageChange = event => {
        console.log("handleImageChange called.");

        setPictureField(event.target.value);
    }

    const handleSubmitChanges = () => {

        console.log("handleSubmitChanges called.");

        if (userNameField.length > maxNameSize || bioField.length > maxBioSize) {
            console.log("One or more fields have errors.");
            return;
        }

        const api = new API();
        async function insertCurrentFields() {

            // username and later... maybe email?
            try {
                const result = await api.alterUserById(loggedInUser, userNameField);
                if (result.status === 200) {
                    // Handle success
                    console.log("Changed user info successfully");
                } else {
                    // Handle failure
                    console.log("Failed to change user info:", result.data);
                }
            } catch (error) {
                // Handle any errors that occur during the API call
                console.error("Error changing user info:", error);
            }

            // bio and later.... picture and color
            try {
                const result = await api.alterProfileById(loggedInUser, bioField, pictureField);
                if (result.status === 200) {
                    // Handle success
                    console.log("Changed profile info successfully");
                } else {
                    // Handle failure
                    console.log("Failed to change profile info:", result.data);
                }
            } catch (error) {
                // Handle any errors that occur during the API call
                console.error("Error changing profile info:", error);
            }

                navigate(`/profile/${loggedInUser}`)
        }
        insertCurrentFields();

    }



    useEffect(() => {
        const api = new API();

        async function getAllUserInfoById() {
            api.getUserById(loggedInUser)
                .then( userJSONstring => {
                    console.log(`api returns user INFO and it is: ${JSON.stringify(userJSONstring)}`);
                    setUserNameField(userJSONstring.data.username);
                });

            api.getUserProfileById(loggedInUser)
                .then( userProfileJSONstring => {
                    console.log(`api returns user PROFILE INFO and it is: ${JSON.stringify(userProfileJSONstring)}`);
                    setBioField(userProfileJSONstring.data.bio);
                    setPictureField(userProfileJSONstring.data.imageURL);
                    setColorField(userProfileJSONstring.data.color);
                });
        }

        getAllUserInfoById();
    }, []);


    return (
        <Paper
            sx={{
                p: 3,
                margin: 'auto',
                mt: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: profileDimensions.page.width,
                flexGrow: 1,
                border: 0
            }}
        >
            <Grid container
                  direction="column"
                  width={profileDimensions.page.width / 2}
                  border={0}
                  justifyContent="center"
                  alignItems="center"
            >
                {/*username*/}
                <Grid container direction="column" width="45%" justifyContent="center"  alignItems="center" sx={{ border: 0 }}>
                    <Typography variant="h6" fontSize="20px" align="left" alignSelf="flex-start">
                        Username
                    </Typography>
                    <Grid item container justifyContent="center" xs={8} sx={{ border: 0 }}> {/* Decreased xs value */}
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                error={maxNameSize <= userNameField.length}
                                id="outlined-multiline-flexible"
                                placeholder="username"
                                value={userNameField}
                                helperText={maxNameSize >= userNameField.length ?
                                    `${maxNameSize - userNameField.length} Characters left`
                                    : `Exceeds Max Character limit!`
                                }
                                onChange={handleUserNameChange}
                                sx={{ width: '100%' }} // Ensure TextField takes full width
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                {/*bio*/}
                <Grid container direction="column" width="90%" justifyContent="center" alignItems="center" sx={{ border: 0, mt: 0 }}>
                    <Typography variant="h6" fontSize="20px" align="left" alignSelf="flex-start">
                        Bio
                    </Typography>
                    <Grid item container justifyContent="center" xs={8} sx={{ border: 0 }}> {/* Decreased xs value */}
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                error={maxBioSize <= bioField.length}
                                id="outlined-multiline-flexible"
                                placeholder="Welcome to my page..."
                                value={bioField}
                                helperText={maxBioSize >= bioField.length ?
                                    `${maxBioSize - bioField.length} Characters left`
                                    : `Exceeds Max Character limit!`
                                }
                                onChange={handleBioChange}
                                rows={7}
                                multiline
                                sx={{ width: '100%' }} // Ensure TextField takes full width
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container direction="column" width="90%" justifyContent="center"  alignItems="center" sx={{ border: 0, mt: 2 }}>
                    <Typography variant="h6" fontSize="20px" align="left" alignSelf="flex-start">
                        Profile Picture
                    </Typography>
                    <Grid item container direction='row' justifyContent="center" xs={8} sx={{ border: 0 }}> {/* Decreased xs value */}
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                id="outlined-multiline-flexible"
                                placeholder="imageURL"
                                value={pictureField}
                                helperText="Provide an image link to display on your profile"
                                onChange={handleImageChange}
                                sx={{ width: '100%' }} // Ensure TextField takes full width
                            />
                        </FormControl>
                    </Grid>
                    <Typography variant="h6" fontSize="10px" alignSelf="center" mt={2} mr={5}>
                        Image:
                    </Typography>
                    <Box
                        sx={{
                            border: 1,
                            width: 70,
                            height: 70,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {imageError ? (
                            <Typography fontSize="14px"  color="red" fontWeight="bold" style={{ textAlign: 'center' }}>
                                Problem with image
                            </Typography>
                        ) : (

                            <img
                                src={pictureField}
                                alt="Profile Picture"
                                width={70}
                                height={70}
                                onError={handleImageError}
                            />
                        )}
                    </Box>
                </Grid>

                <Grid item container justifyContent="center" alignItems="center" border={0} mt={5}>
                    <Button variant="outlined"
                            onClick={() => handleSubmitChanges()}
                            sx={{
                                border: 0,
                                color:'white',
                                backgroundColor:'#535C91',
                                '&:hover':{
                                    backgroundColor:'#404E7C'
                                }
                            }}
                    >
                        Submit Changes
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}