import React, {useEffect, useState} from 'react';
import axios from "axios";
import dayjs from 'dayjs';
import Header from "../partials/Header";
import SimpleDateTime from 'react-simple-timestamp-to-date';
import {Gauge} from 'framework7-react';
import {useParams, useNavigate} from "react-router-dom";

const Player = () => {

    let {id} = useParams();
    const [isLoading, setLoading] = useState(true);
    const [playerInfo, setPlayerInfo] = useState([]);
    const [playerMatch, setPlayerMatch] = useState([]);
    const [lose, setLose] = useState([]);
    const [win, setWin] = useState([]);
    const [matchInfo, setMatchInfo] = useState([]);
    const [heroesStat, setHeroesStat] = useState([]);
    const [topTen, setTopTen] = useState([]);
    const [winLoss, setWinLoss] = useState([]);
    const [peers, setPeers] = useState([]);
    const navigate = useNavigate();

    const getHeroAvatar = () => {
        {
            playerMatch.map((match) => (
                axios.get(`https://api.opendota.com/api/matches/${match.match_id}`).then((response) => {
                    setMatchInfo(response.data);
                })));
        }
    }

    const pushToPlayer = (playerId) => {
        navigate(`/player/${playerId}`)
        window.location.reload();
    }

    useEffect(() => {
        getHeroAvatar();
        axios.get(`https://api.opendota.com/api/players/${id}`).then((response) => {
            setPlayerInfo(response.data);
        });
        axios.get(`https://api.opendota.com/api/heroStats`).then((response) => {
            setHeroesStat(response.data);
        });
        axios.get(`https://api.opendota.com/api/players/${id}/heroes`).then((response) => {
            setTopTen(response.data);
        });
        axios.get(`https://api.opendota.com/api/players/${id}/wl`).then((response) => {
            setWinLoss(response.data);
        });
        axios.get(`https://api.opendota.com/api/players/${id}/recentMatches`).then((response) => {
            setPlayerMatch(response.data);
        });
        axios.get(`https://api.opendota.com/api/players/${id}/matches?win=0`).then((response) => {
            setLose(response.data);
        });
        axios.get(`https://api.opendota.com/api/players/${id}/peers`).then((response) => {
            setPeers(response.data);
        });
        axios.get(`https://api.opendota.com/api/players/${id}/matches?win=1`).then((response) => {
            setWin(response.data);
            setLoading(false);
        });
    }, [isLoading]);


    console.log(peers)
    console.log(playerMatch)

    dayjs.locale("fr");

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen w-screen">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-dota_dark_blue">
            </div>
        </div>
    }
    return (
        <div>
            <Header src={playerInfo.profile.avatarfull} name={playerInfo.profile.personaname} win={winLoss.win}
                    lose={winLoss.lose}/>
            <div className="sm:flex justify-center sm:flex-col lg:flex-row md:flex-col mb-24">
                <div className="flex justify-center mt-8 mx-4">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <h1 className="text-2xl uppercase text-dota_grey2 font-bold mt-4 mb-4">Historique des
                                parties</h1>
                            <div
                                className="shadow overflow-hidden border-b border-gray-200 dota_dark_blue sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-dota_dark_blue">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-dota_grey uppercase tracking-wider"
                                        >
                                            Héros
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-dota_grey uppercase tracking-wider"
                                        >
                                            Résultat
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-dota_grey uppercase tracking-wider"
                                        >
                                            Type
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-dota_grey uppercase tracking-wider"
                                        >
                                            Durée
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-dota_grey uppercase tracking-wider"
                                        >
                                            KDA
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {playerMatch.map((match) => (
                                        <tr key={match.match_id}>
                                            <td className="px-3 py-1 whitespace-nowrap">
                                                {heroesStat.filter(heros => heros.id === match.hero_id).map(filteredName => (
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-8 w-18">
                                                            <img className="w-full h-full rounded"
                                                                 src={`https://api.opendota.com${filteredName.img}`}
                                                                 alt=""/>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div
                                                                className="text-sm font-medium text-gray-900">{filteredName.localized_name}</div>
                                                            <div
                                                                className="text-sm text-gray-500"><SimpleDateTime
                                                                dateFormat="DMY" dateSeparator="/"
                                                                timeSeparator=":">{match.start_time}</SimpleDateTime>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="px-6 py-2 whitespace-nowrap" key={win.match_id}>
                                                {match.player_slot < 5 && match.radiant_win === true && (
                                                    <span
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded bg-green-100 text-green-800">
                        Victoire
                      </span>
                                                )}
                                                {match.player_slot > 5 && match.radiant_win === true && (
                                                    <span
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded bg-red-100 text-red-800">
                        Défaite
                      </span>
                                                )}
                                                {match.player_slot < 5 && match.radiant_win === false && (
                                                    <span
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded bg-red-100 text-red-800">
                        Défaite
                      </span>
                                                )}
                                                {match.player_slot > 5 && match.radiant_win === false && (
                                                    <span
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded bg-green-100 text-green-800">
                        Victoire
                      </span>
                                                )}
                                            </td>
                                            <td className="flex flex-col px-6 py-2 whitespace-nowrap"
                                                key={win.match_id}>
                                                {match.lobby_type === 0 ? (
                                                    <span
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded">
                        Normal
                      </span>
                                                ) : (
                                                    match.lobby_type === 7 && <span
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded">
                        Classée
                      </span>
                                                )}
                                                {match.game_mode === 22 ? (
                                                    <span
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded">
                        All Pick
                      </span>
                                                ) : match.game_mode === 23 ? (
                                                    <span
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded">
                        Turbo
                      </span>
                                                ) : match.game_mode === 1 ? (
                                                    <span
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded">
                        All pick
                      </span>
                                                ): match.game_mode === 19 && (
                                                    <span
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded">
                        Aghanym's Labyrinth
                      </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-1 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded">
                        {Math.floor(match.duration / 60)} : {(match.duration - Math.floor(match.duration / 60) * 60)}
                      </span>
                                            </td>
                                            <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">{match.kills} / {match.deaths} / {match.assists}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-center mt-8 mx-4">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <h1 className="flex justify-start text-2xl uppercase text-dota_grey2 font-bold mt-4 mb-4">Héros
                                    les plus joués</h1>
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-dota_dark_blue">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-dota_grey uppercase tracking-wider"
                                            >
                                                Héros
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-dota_grey uppercase tracking-wider"
                                            >
                                                Parties
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-dota_grey uppercase tracking-wider"
                                            >
                                                Win %
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {topTen.slice(0, 10).map((list) => (
                                            <tr key={list.id}>
                                                <td className="px-3 whitespace-nowrap">
                                                    {heroesStat.filter(heroes => heroes.id == list.hero_id).map(filteredHero => (
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-8 w-18">
                                                                <img className="w-full h-full rounded"
                                                                     src={`https://api.opendota.com${filteredHero.img}`}
                                                                     alt=""/>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div
                                                                    className="text-sm font-medium text-gray-900">{filteredHero.localized_name}</div>
                                                                <div
                                                                    className="text-sm font-medium text-gray-900"></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </td>
                                                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">{list.games}</td>
                                                <td className="px-6 py-1 whitespace-nowrap">
                                                    <Gauge
                                                        type="circle"
                                                        value={list.win / list.games}
                                                        size={50}
                                                        borderColor="#01C38D"
                                                        borderWidth={5}
                                                        valueText={`${Math.floor((list.win / list.games) * 100)}%`}
                                                        valueFontSize={12}
                                                        valueTextColor="#01C38D"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-8 mx-4 mb-24">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <h1 className="flex justify-start text-2xl uppercase text-dota_grey2 font-bold mt-4 mb-4">Joueurs avec qui vous avez joué</h1>
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-dota_dark_blue">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-dota_grey uppercase tracking-wider"
                                            >
                                                Joueur
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-dota_grey uppercase tracking-wider"
                                            >
                                                Parties
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-dota_grey uppercase tracking-wider"
                                            >
                                                Win %
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {peers.slice(0, 5).map((peer) => (
                                            <tr
                                                onClick={() => pushToPlayer(peer.account_id)}
                                                className="cursor-pointer">
                                                <td
                                                    className="px-3 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-8 w-18">
                                                                <img className="w-full h-full rounded"
                                                                     src={`${peer.avatarfull}`}
                                                                     alt=""/>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div
                                                                    className="text-sm font-medium text-gray-900">{peer.personaname}</div>
                                                                <div
                                                                    className="text-sm font-medium text-gray-900"></div>
                                                            </div>
                                                        </div>
                                                </td>
                                                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">{peer.with_games}</td>
                                                <td className="px-6 py-1 whitespace-nowrap">
                                                    <Gauge
                                                        type="circle"
                                                        value={peer.with_win / peer.with_games}
                                                        size={50}
                                                        borderColor="#01C38D"
                                                        borderWidth={5}
                                                        valueText={`${Math.floor((peer.with_win / peer.with_games) * 100)}%`}
                                                        valueFontSize={12}
                                                        valueTextColor="#01C38D"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
