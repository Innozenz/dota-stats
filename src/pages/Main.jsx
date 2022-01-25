import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import Player from "./Player";
import Search from "./Search";

const Main = () => {
    return (
        <div>
            <Routes> {/* The Switch decides which component to show based on the current URL.*/}
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/player/:id' element={<Player/>}/>
                <Route exact path='/search' element={<Search/>}/>
            </Routes>
        </div>
    );
};

export default Main;
