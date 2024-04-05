import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2', justifyContent: 'space-between' }}>
            <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
                {/* Logo */}
                <Typography variant="h6" sx={{ color: 'white', cursor: 'pointer' }} onClick={() => handleNavigate('/')}>
                    QuizSocial
                </Typography>

                {/* Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button sx={{ color: 'white', margin: '0 10px' }} onClick={() => handleNavigate('/profile')}>
                        My Profile
                    </Button>
                    <Button sx={{ color: 'white', margin: '0 10px' }} onClick={() => handleNavigate('/following')}>
                        Following
                    </Button>
                    <Button sx={{ color: 'white', margin: '0 10px' }} onClick={() => handleNavigate('/favorite')}>
                        Favorite
                    </Button>
                    <Button sx={{ color: 'white', margin: '0 10px' }} onClick={() => handleNavigate('/search-quiz')}>
                        Search Quiz
                    </Button>
                </Box>

                <Box sx={{ width: 240, display: { xs: 'none', sm: 'block' } }}></Box>
            </Toolbar>
        </AppBar>
    );
};

export default Banner;
