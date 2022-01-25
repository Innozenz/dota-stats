import React, {useState} from 'react';
import SearchBar from "../partials/SearchBar";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [name, setName] = useState("");
    const navigate = useNavigate();

    const search = () => {
        navigate(`/search?q=${name}`)
    }

    const handleKeyPress = e => {
        if (e.charCode === 13) {
            search();
        }
    }

    return (
        <div>
            <div className="font-sans text-black min-h-screen bg-dota_blue flex items-center justify-center flex-col">
                <h1 className="text-3xl font-bold underline">Recherchez un joueur...</h1>
                <SearchBar
                    onKeyPress={handleKeyPress}
                    onChange={(event) => {
                        setName(event.target.value)
                    }}
                    value={name}
                onClick={search}/>
            </div>
        </div>
    );
};

export default Home;
