import {React, useState, Fragment} from 'react';
import Banner from '../Banner/Banner';
import {Router, Routes, Route} from 'react-router-dom'


import Home from '../pages/home';
import Activity from '../pages/activity';
import Following from '../pages/following';
import Favorites from '../pages/favorites';
import Login from '../pages/login';
import Register from '../pages/register'
import Profile from '../pages/profile';
import Search from '../pages/search';
import Quiz from '../pages/quiz';


export default function Main() {

    const [user, setUser] = useState(undefined);

    return (
        <Fragment>
            <Banner/>
            <Routes>
                <Route path="/"  element={<Home/>}/>
                <Route path="/activity" element={<Activity />} />
                <Route path="/following" element={<Following />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/login" element={<Login user={user} setUser={setUser} />} />
                <Route path="/register" element={<Register user={user} setUser={setUser} />} />
                <Route path="/profile/:userID" element={<Profile/>} />
                <Route path="/search" element={<Search/>} />
                <Route path="/quiz/:quizID" element={<Quiz/>} />
            </Routes>
        </Fragment>
    )

}
