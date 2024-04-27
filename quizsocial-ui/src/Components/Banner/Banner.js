import React, {useState, Fragment} from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import siteSettings from "../utils/siteSettings"
import "../../App.css";

const Banner = ({userID, setUserID}) => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <AppBar position="static" color={'primary'}>
            <Toolbar>
                {/* Logo */}
                <Typography variant="h6"
                            sx={{ color: 'white',
                                cursor: 'pointer',
                                minWidth: '120px',
                            }}
                            onClick={() => handleNavigate('/')}>
                    Quiz Social
                </Typography>

                {/* Buttons */}
                <Stack direction = 'row' spacing={2} sx={{flexGrow: 1, justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto'}}>
                    <Button sx={{ color: 'white' }} onClick={() => {userID !== undefined ? handleNavigate(`/profile/${userID}`) : handleNavigate('/login')}}>
                        My Profile
                    </Button>
                    <Button sx={{ color: 'white' }} onClick={() => handleNavigate('/activity')}>
                        Activity
                    </Button>
                    <Button sx={{ color: 'white' }} onClick={() => handleNavigate(`following/${userID}`)}>
                        Following
                    </Button>
                    <Button sx={{ color: 'white' }} onClick={() => handleNavigate('/favorites')}>
                        Favorites
                    </Button>
                    <Button sx={{ color: 'white' }} onClick={() => handleNavigate('/search')}>
                        Search
                    </Button>
                </Stack>

                {/* Login/Logout */}

                {userID != undefined ? (
                    <Typography variant="h6" sx={{ color: 'white', cursor: 'pointer', minWidth: '80px', ml: 2.5 }} onClick={() => {setUserID(undefined); handleNavigate('/')}}>
                        Logout
                    </Typography>
                ) : (
                    <Typography variant="h6" sx={{ color: 'white', cursor: 'pointer', minWidth: '80px', ml: 2.5 }} onClick={() => handleNavigate('/login')}>
                        Login
                    </Typography>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Banner;