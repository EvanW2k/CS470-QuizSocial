import React,{useState, Fragment} from 'react';
import Banner from './Components/Banner/Banner';
import {Router, Routes, Route} from 'react-router-dom'


import Login from './Components/Pages/login';
import Activity from './Components/Pages/activity';
import Following from './Components/Pages/following';
import Favorites from './Components/Pages/favorites';
import Home from './Components/Pages/home';
import Profile from './Components/Pages/profile';
import EditProfile from './Components/Pages/edit-profile';
import Quiz from './Components/Pages/quiz';
import FlashCard from "./Components/Pages/Games/FlashCard";
import MatchGame from "./Components/Pages/Games/MatchGame";
import FastMultipleChoice from "./Components/Pages/Games/FastMultipleChoice";
import FillingTheBlank from "./Components/Pages/Games/FillingTheBank";
import Register from './Components/Pages/register';
import Search from  './Components/Pages/search';
import EditQuiz from './Components/Pages/edit-quiz';

export default function Main() {

    const [userID, setUserID] = useState(undefined);
    

    return (
        <Fragment>
            <Banner userID={userID} setUserID={setUserID}/>
            <Routes>
                <Route path="/"  element={<Home/>}/>
                <Route path="/login" element={<Login setUserID={setUserID} />} />
                <Route path="/activity/:userID" element={<Activity />} />
                <Route path="/following/:userID" element={<Following />} />
                <Route path="/favorites/:userID" element={<Favorites />} />
                <Route path="/profile/:userID" element={<Profile loggedInUser={userID}/>} />
                <Route path="/edit-profile/:userID" element={<EditProfile loggedInUser={userID}/>} />
                <Route path="/quiz/:quizID" element={<Quiz loggedInUser={userID}/>} />
                <Route path="/flash-cards/:quizID" element={<FlashCard loggedInUser={userID}/>} />
                <Route path="/match-game/:quizID" element={<MatchGame loggedInUser={userID}/>} />
                <Route path="/fastmc-game/:quizID" element={<FastMultipleChoice loggedInUser={userID}/>} />
                <Route path="/filling-the-blank/:quizID" element={<FillingTheBlank loggedInUser={userID}/>} />
                <Route path="/register" element={<Register userID={userID} setUserID={setUserID} />} />
                <Route path="/search" element={<Search/>} />
                <Route path="/edit-quiz/:quizID" element={<EditQuiz loggedInUser={userID}/>} />
            </Routes>
        </Fragment>
    )

}

