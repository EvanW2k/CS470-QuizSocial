import React from 'react';
import { Typography, Grid, Box, CardMedia, Paper } from '@mui/material';
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            <Grid container spacing={3} alignItems="left" justifyContent="left" style={{ minHeight: '100vh' }}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{p: 3, bgcolor: 'background.default', mt: 4, height: 650}}>
                        <Typography variant="h4" gutterBottom>
                            Welcome to Quiz Social —
                        </Typography>
                        <Typography variant="h5">
                            Your Gateway to Interactive Learning!
                        </Typography>
                        <hr
                            style={{
                                color: 'black',
                                backgroundColor: 'black',
                                width: '100%',
                            }}
                        />
                        <Typography variant="body1" sx={{mb: 2}}>
                            At Quiz Social, we revolutionize the way you study and connect with educational content
                            online.
                            Create and share quizzes to challenge yourself and your followers, and explore a diverse
                            collection
                            of quizzes created by others in our community. Join us to enhance your learning journey and
                            engage
                            with peers who share your passion for knowledge.
                        </Typography>
                        <Typography variant="h6">
                            Ready to take your learning experience to the next level?
                            Sign up today and start discovering, learning, and growing with Quiz Social!
                        </Typography>
                        <Grid container direction={'row'}
                            sx={{
                                justifyContent: 'center',
                                alignContent: 'center',
                                height: '50%'
                            }}
                        >
                            <Button component={Link} to="/register/" sx={{
                                border: 0,
                                mr: 5,
                                height: 70,
                                width: 120,
                                color: 'white',
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#115293',
                                },
                                textDecoration: 'none'
                            }}>
                                Register
                            </Button>
                            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                                or
                            </Typography>
                            <Button component={Link} to="/login/" sx={{
                                border: 1,
                                ml: 5,
                                height: 70,
                                width: 120,
                                color: '#1976d2',
                                backgroundColor: 'white',
                                '&:hover': {
                                    backgroundColor: 'lightgrey',
                                },
                                textDecoration: 'none'
                            }}>
                                Login
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} mt={4}>
                    <CardMedia
                        component="img"
                        sx={{width: '100%', height: 700, objectFit: 'cover', objectPosition: 'center' }}
                        image="https://images.pexels.com/photos/6177658/pexels-photo-6177658.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt="Decorative image"
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

