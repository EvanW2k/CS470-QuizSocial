import {React, useState, Fragment} from 'react';
import Banner from '../Banner/Banner';
import {Router, Routes, Route} from 'react-router-dom'


import Home from '../pages/home';
import Activity from '../pages/activity';
import Following from '../pages/following';
import Favorites from '../pages/favorites';
import Login from '../pages/login';
import Profile from '../pages/profile';
import Search from '../pages/search';


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
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/search" element={<Search/>} />
            </Routes>
        </Fragment>
    )

}
