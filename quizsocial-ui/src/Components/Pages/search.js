import React, { useState } from 'react';
import { Box, TextField, Button, ToggleButtonGroup, ToggleButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('username'); // Default search type
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTypeChange = (event, newType) => {
        if (newType !== null) {
            setSearchType(newType);
        }
    };

    const performSearch = () => {
        if (searchType === 'username' && searchTerm) {
            axios.get(`/user/search?username=${encodeURIComponent(searchTerm)}`)
                .then(response => {
                    setSearchResults(response.data); // Assuming the response data is the array of users
                })
                .catch(error => {
                    console.error('Search failed:', error);
                    setSearchResults([]); // Clear results on error
                });
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Search
            </Typography>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ mb: 2, width: '80%', maxWidth: 500 }}
            />
            <ToggleButtonGroup
                value={searchType}
                exclusive
                onChange={handleTypeChange}
                sx={{ mb: 2 }}
            >
                <ToggleButton value="username" aria-label="username">
                    Username
                </ToggleButton>
                <ToggleButton value="quiz" aria-label="quiz">
                    Quiz
                </ToggleButton>
                <ToggleButton value="question" aria-label="question">
                    Question
                </ToggleButton>
            </ToggleButtonGroup>
            <Button variant="contained" onClick={performSearch} sx={{ width: '80%', maxWidth: 500 }}>
                Search
            </Button>
            {searchResults.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 2, maxWidth: 900, width: '100%' }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User ID</TableCell>
                                <TableCell align="right">Username</TableCell>
                                <TableCell align="right">Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchResults.map((row) => (
                                <TableRow key={row.userID}>
                                    <TableCell component="th" scope="row">
                                        {row.userID}
                                    </TableCell>
                                    <TableCell align="right">{row.username}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}
