import {React, useState, Fragment} from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();



    let loggedin = false;   // place holder for where logged in or not


    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2'}}>
            <Toolbar>
                {/* Logo */}
                <Typography variant="h6" sx={{ color: 'white', cursor: 'pointer', minWidth: '120px' }} onClick={() => handleNavigate('/')}>
                    Quiz Social
                </Typography>

                {/* Buttons */}
                <Stack direction = 'row' spacing={2} sx={{flexGrow: 1, justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto'}}>
                    <Button sx={{ color: 'white' }} onClick={() => handleNavigate('/profile')}>
                        My Profile
                    </Button>
                    <Button sx={{ color: 'white' }} onClick={() => handleNavigate('/activity')}>
                        Activity
                    </Button>
                    <Button sx={{ color: 'white' }} onClick={() => handleNavigate('/following')}>
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
                <Typography variant="h6" sx={{ color: 'white', cursor: 'pointer', minWidth: '80px' }} onClick={() => handleNavigate('/login')}>
                    {loggedin ? "Logout" : "Login"}
                </Typography>

            </Toolbar>
        </AppBar>
    );
};

export default Banner;
