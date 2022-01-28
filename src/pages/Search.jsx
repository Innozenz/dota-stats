import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import ProfileCard from "../partials/ProfileCard";

const Search = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
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
        <div className="p-36 grid grid-cols-4 gap-x-0.5 gap-y-12 w-full h-screen flex-auto">
            {listOfPlayers.map((list) => (
                <ProfileCard onClick={() => pushToProfile(list.account_id)} src={list.avatarfull} name={list.personaname}/>
            ))}
        </div>
    );
};

export default Search;
