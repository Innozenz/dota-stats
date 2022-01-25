import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";

const Search = () => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    searchParams.get("search");
    const [listOfPlayers, setListOfPlayers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://api.opendota.com/api/search?q=${searchParams}`).then((response) => {
            setListOfPlayers(response.data);
            setLoading(false)
        });
    }, []);

    console.log(listOfPlayers)
    console.log(searchParams)

    const pushToProfile = (id) => {
        navigate(`/player/${id}`)
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen w-screen">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-dota_dark_blue">
            </div>
        </div>
    }

    return (
        // <div>
        //     {listOfPlayers.map((list) => (
        //     <div onClick={() => pushToProfile(list.account_id)} className="py-8 w-full">
        //         <div className="lg:flex items-center justify-center w-full">
        //             <div className="lg:w-2/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded">
        //                 <div className="flex items-center border-b border-gray-200 pb-6">
        //                     <img src={`${list.avatarfull}`} alt className="w-12 h-12 rounded-full" />
        //                     <div className="flex items-start justify-between w-full">
        //                         <div className="pl-3 w-full">
        //                             <p className="text-xl font-medium leading-5 text-gray-800">{list.personaname}</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     ))}
        // </div>
        <div className="p-36 grid grid-cols-4 gap-x-0.5 gap-y-12 w-full h-screen flex-auto">
            {listOfPlayers.map((list) => (
                <div key={list.account_id} onClick={() => pushToProfile(list.account_id)}
                    className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-coolGray-900 dark:text-coolGray-100 cursor-pointer">
                    <img src={`${list.avatarfull}`} alt=""
                         className="w-16 h-16 mx-auto rounded-full dark:bg-coolGray-500"/>
                    <div
                         className="space-y-4 text-center divide-y divide-coolGray-700">
                        <div className="my-2 space-y-1">
                            <h2 className="text-xl font-semibold sm:text-2xl">{list.personaname}</h2>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Search;
