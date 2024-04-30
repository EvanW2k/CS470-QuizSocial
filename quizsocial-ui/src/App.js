import React,{useState, Fragment} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Main from './Main';

import "./App.css";
import siteSettings from "../src/Components/utils/siteSettings"
import {Typography} from "@mui/material";

function App() {

    return (
        <ThemeProvider theme={siteSettings.theme}>
            <div>
                <Main/>
            </div>
        </ThemeProvider>

    );
}

export default App;
