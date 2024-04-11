import React,{useState, Fragment} from 'react';
import Banner from './Components/Banner/Banner';
import {Router, Routes, Route} from 'react-router-dom'


import Login from './Login';
import Activity from './Components/Pages/activity';
import Following from './Components/Pages/following';
import Favorites from './Components/Pages/favorites';
import Home from './Components/Pages/home';
import Profile from './Components/Pages/profile';
import Quiz from './Components/Pages/quiz';
import Register from './Components/Pages/register';
import Search from  './Components/Pages/search'

export default function Main() {

    const [user, setUser] = useState(undefined);

    return (
        <Fragment>
            <Banner/>
            <Routes>
                <Route path="/"  element={<Home/>}/>
                <Route path="/login" element={<Login user={user} setUser={setUser} />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/following" element={<Following />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/profile/:userID" element={<Profile/>} />
                <Route path="/quiz/:quizID" element={<Quiz/>} />
                <Route path="/register" element={<Register user={user} setUser={setUser} />} />
                <Route path="/search" element={<Search/>} />
            </Routes>
        </Fragment>
    )

}

