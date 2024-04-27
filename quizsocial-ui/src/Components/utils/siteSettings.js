import {createTheme, } from "@mui/material/styles";



const theme = createTheme({
    palette: {
        primary: {
            main: '#1B1A55', // Custom primary color
        },
        secondary: {
            main: '#FFFFFF', // Custom secondary color
        },
        text: {
            secondary: '#6495ED', // Set your desired text.secondary color here
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1B1A55', // Set your desired background color here
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF', // Set your desired background color here
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF', // Text color
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF', // Text color
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF', // Text color
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF', // Text color
                    '&:hover': {
                        backgroundColor: '#FF0000', // Text color on hover
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        position: 'relative',
                        padding: '15px 26px 10px 12px',
                        '&:focus': {
                            borderRadius: 4,
                            borderColor: '#000000',
                        },
                        '&:not(focus)': {
                            borderRadius: 4,
                            borderColor: '#000000',
                        },
                    },
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF', // Text color
                    backgroundColor: '#1B1A55', // Background color
                    '&:hover': {
                        backgroundColor: '#4a5cc5', // Hover background color
                    },
                    '&.Mui-selected': {
                        color: '#FFFFFF', // Toggled text color
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF', // Text color
                },
            },
        },
    },
});


const settings = {
    theme,
}

export default settings;