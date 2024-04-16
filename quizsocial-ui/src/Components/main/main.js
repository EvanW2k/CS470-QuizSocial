import {React, useState, Fragment} from 'react';
import Banner from '../Banner/Banner';
import {Router, Routes, Route} from 'react-router-dom'


import Home from '../Pages/home';
import Activity from '../Pages/activity';
import Following from '../Pages/following';
import Favorites from '../Pages/favorites';
import Login from '../Pages/login';
import Register from '../Pages/register'
import Profile from '../Pages/profile';
import Search from '../Pages/search';
import Quiz from '../Pages/quiz';
import createQuiz from '../Pages/createQuiz';


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
                <Route path="/createQuiz" element={<createQuiz/>} />
            </Routes>
        </Fragment>
    )

}
