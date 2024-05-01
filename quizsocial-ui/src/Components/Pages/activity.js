import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../API_Interface/API_Interface';
import {Box, Typography, Card, CardContent, CardMedia, Grid, Button} from '@mui/material';

const Activity = () => {
    const { userID } = useParams();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            setLoading(true);
            const api = new API();
            try {
                const response = await api.getFollowingActivities(userID);
                if (response.data && Array.isArray(response.data)) {
                    setActivities(response.data);
                } else {
                    setActivities([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch activities:', error);
                setLoading(false);
            }
        };

        fetchActivities();
    }, [userID]);

    if (loading) {
        return <Typography>Loading activities...</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>Activity</Typography>
            {activities.length > 0 ? (
                activities.map(activity => (
                    <Card key={activity.quizID} sx={{ mb: 2 }}>
                        <CardContent>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 50, height: 50, borderRadius: '50%' }}
                                        image={activity.userProfileImage || "https://via.placeholder.com/50"}
                                        alt="User Profile"
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="subtitle1">{activity.username} created</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {activity.title}
                                    </Typography>
                                    <Typography variant="body2">{new Date(activity.created_at).toLocaleDateString()}</Typography>
                                </Grid>
                                <Grid item>
                                    <Button size="small" component={Link} to={`/quiz/${activity.quizID}`}
                                            sx={{
                                                border: 0,
                                                mr: 2,
                                                color:'white',
                                                backgroundColor:'#535C91',
                                                '&:hover':{
                                                    backgroundColor:'#404E7C'
                                                }
                                            }}
                                    >
                                        View Quiz
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No recent activities from followed users.</Typography>
            )}
        </Box>
    );
};

export default Activity;

