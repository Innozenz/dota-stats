import React from 'react';
import Avatar from "./Avatar";
import {Link} from "react-router-dom";
import {HiArrowLeft} from "react-icons/hi";

const Header = (props) => {
    return (
        <div className="flex justify-center">
            <div className="flex justify-center mr-28">
                <div className="flex mt-12 mr-14 h-28 w-14 items-center">
                    <Link to="/">
                        <HiArrowLeft size={25}/>
                    </Link>
                </div>
                <header className="p-24 dark:bg-coolGray-800 dark:text-coolGray-100">
                    <div className="container flex justify-between h-16 mx-auto mb-16">
                        <div className="flex">
                            <Avatar src={props.src} name={props.name}/>
                            <div className="flex flex-col ml-8">
                                <h1>Victoires: </h1><h1 className="text-green-500">{props.win}</h1>
                                <h1 className="mt-4">Défaites: </h1><h1 className="text-red-500">{props.lose}</h1>
                                <h1 className="mt-4">Winrate: </h1><h1
                                className="text-dota_dark_blue">{`${((props.win / (props.win + props.lose)) * 100).toFixed(2)}%`}</h1>
                            </div>
                        </div>

                        {/*<div className="items-center flex-shrink-0 hidden lg:flex">*/}
                        {/*    <button className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">Log in</button>*/}
                        {/*</div>*/}
                        {/*<button className="p-4 lg:hidden">*/}
                        {/*    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">*/}
                        {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>*/}
                        {/*    </svg>*/}
                        {/*</button>*/}
                    </div>
                </header>
            </div>
        </div>
    );
};

export default Header;
