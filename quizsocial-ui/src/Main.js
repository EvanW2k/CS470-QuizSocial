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
import Register from './Components/Pages/register';
import Search from  './Components/Pages/search'

export default function Main() {

    const [userID, setUserID] = useState(undefined);
    

    return (
        <Fragment>
            <Banner userID={userID} setUserID={setUserID}/>
            <Routes>
                <Route path="/"  element={<Home/>}/>
                <Route path="/login" element={<Login setUserID={setUserID} />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/following" element={<Following />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/profile/:userID" element={<Profile loggedInUser={userID}/>} />
                <Route path="/edit-profile/:userID" element={<EditProfile loggedInUser={userID}/>} />
                <Route path="/quiz/:quizID" element={<Quiz/>} />
                <Route path="/register" element={<Register userID={userID} setUserID={setUserID} />} />
                <Route path="/search" element={<Search/>} />
            </Routes>
        </Fragment>
    )

}

