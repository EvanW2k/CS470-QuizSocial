import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../API_Interface/API_Interface';
import { Box, Typography, Card, CardContent, CardMedia, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
export default function Favorites() {

    const { userID } = useParams();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            const api = new API();
            try {
                const response = await api.getFavorites(userID);
                if (Array.isArray(response.data)) {
                    setFavorites(response.data);
                } else {
                    setFavorites([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch favorites:', error);
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [userID]);

    if (loading) {
        return <Typography>Loading favorites...</Typography>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>Favorites</Typography>
            {favorites.length > 0 ? favorites.map((quiz) => (
                <Card key={quiz.title} sx={{ display: 'flex', flexDirection: 'row', mb: 2, width: '100%', maxWidth: 700 }}>
                    <CardContent sx={{ flex: '1 0 auto', maxWidth: 'calc(100% - 170px)' }}>
                        <Typography variant="h6" noWrap>Owner: {quiz.owner}</Typography>
                        <Typography variant="subtitle1" color="text.secondary" noWrap>
                            Favorited on: {quiz.dateFav.split("T")[0]}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" component={Link} to={`/quiz/${quiz.ID}`}>
                            View Quiz
                        </Button>
                    </CardActions>
                </Card>
            )) : <Typography>You are not following anyone yet.</Typography>}
        </Box>
    );

}