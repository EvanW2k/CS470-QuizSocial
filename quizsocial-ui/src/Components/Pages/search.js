import React, {useEffect, useState} from 'react';
import {
    Box, TextField, Button, ToggleButtonGroup, ToggleButton,
    Typography, Card, CardContent, CardActions, CardMedia
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

import "../utils/siteSettings"

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('username');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        setSearchResults([])
        setSearchTerm('')
    }, [searchType]);
    const handleTypeChange = (event, newType) => {
        if (newType !== null) {
            setSearchType(newType);
        }
    };

    const performSearch = () => {
        let url;
        if (searchType === 'username' && searchTerm) {
            url = `/user/search-info?username=${encodeURIComponent(searchTerm)}`;
        } else if (searchType === 'quiz' && searchTerm) {
            url = `/quizzes/search?title=${encodeURIComponent(searchTerm)}`;
        } else {
            return;
        }

        axios.get(url)
            .then(response => {
                if (Array.isArray(response.data)) {
                    setSearchResults(response.data);
                } else {
                    console.error('Expected array, got:', response.data);
                    setSearchResults([]);
                }
            })
            .catch(error => {
                console.error('Search failed:', error);
                setSearchResults([]);
            });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>Search</Typography>
            <TextField
                placeholder="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps = {{
                    sx: {
                        bgcolor: '#1B1A55',
                    },
                }}
                sx={{ mb: 2,
                    width: '80%',
                    maxWidth: 500,
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: '#4a5cc5', // change the outline color when focused
                        },
                    },

                }}
            />
            <ToggleButtonGroup
                value={searchType}
                exclusive
                onChange={handleTypeChange}
                sx={{ mb: 2 }}
            >
                <ToggleButton value="username" aria-label="username">Username</ToggleButton>
                <ToggleButton value="quiz" aria-label="quiz">Quiz</ToggleButton>
            </ToggleButtonGroup>
            <Button variant="contained" onClick={performSearch} sx={{ width: '80%', maxWidth: 500 }}>
                Search
            </Button>
            {searchResults.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                    {searchResults.map((result) => (
                        searchType === 'username' ?
                            <Card key={result.userID} sx={{ display: 'flex', flexDirection: 'row', mb: 2, width: '100%', maxWidth: 700 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    image= {result.imageURL}
                                    alt="Placeholder"
                                />
                                <CardContent sx={{ flex: '1 0 auto', maxWidth: 'calc(100% - 170px)' }}>
                                    <Typography variant="h6" noWrap>{result.username}</Typography>
                                    <Typography variant="subtitle1" color="text.secondary" noWrap>
                                        ID: {result.userID}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" component={Link} to={`/profile/${result.userID}`}>
                                        View Profile
                                    </Button>
                                </CardActions>
                            </Card> :
                            <Card key={result.quizID} sx={{ mb: 2, width: '100%', maxWidth: 700 }}>
                                <CardContent>
                                    <Typography variant="h6" noWrap>{result.title}</Typography>
                                    <Typography variant="subtitle2" color="text.secondary" noWrap>
                                        ID: {result.quizID}
                                    </Typography>
                                    <Typography variant="body1">{result.description}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" component={Link} to={`/quiz/${result.quizID}`}>
                                        View Quiz
                                    </Button>
                                </CardActions>
                            </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
}
