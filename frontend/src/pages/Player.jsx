import React, {useEffect, useState} from 'react';
import axios from "axios";
import dayjs from 'dayjs';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import Header from "../partials/Header";
import SimpleDateTime from 'react-simple-timestamp-to-date';
import {Gauge} from 'framework7-react';
import {useParams} from "react-router-dom";

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

    const getHeroAvatar = () => {
        {
            playerMatch.map((match) => (
                axios.get(`https://api.opendota.com/api/matches/${match.match_id}`).then((response) => {
                    setMatchInfo(response.data);
                })));
        }
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
        axios.get(`https://api.opendota.com/api/players/${id}/matches?win=1`).then((response) => {
            setWin(response.data);
            setLoading(false);
        });
    }, [isLoading]);


    console.log(matchInfo)
    console.log(topTen)
    console.log(heroesStat)
    console.log(playerMatch)
    console.log(playerInfo)

    dayjs.locale("fr");

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen w-screen">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-dota_dark_blue">
            </div>
        </div>
    }
    return (
        <div>
            <Header src={playerInfo.profile.avatarfull} name={playerInfo.profile.personaname} win={winLoss.win} lose={winLoss.lose}/>
            <div className="flex justify-center">
                <div className="flex justify-center mt-8 mx-4">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 dota_dark_blue sm:rounded-lg">
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
                                            <td className="px-6 py-4 whitespace-nowrap">
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
                                                            <div
                                                                className="text-sm font-medium text-gray-900">{match.skill}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap" key={win.match_id}>
                                                {win.filter(wins => wins.match_id === match.match_id).map(() => (
                                                    <span
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded bg-green-100 text-green-800">
                        Victoire
                      </span>
                                                ))}
                                                {lose.filter(loses => loses.match_id === match.match_id).map(() => (
                                                    <span
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded bg-red-100 text-red-800">
                        Défaite
                      </span>
                                                ))}
                                            </td>
                                            <td className="flex flex-col px-6 py-4 whitespace-nowrap"
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
                                                {match.game_mode === 22 && (
                                                    <span
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded">
                        All Pick
                      </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded">
                        {Math.floor(match.duration / 60)} : {(match.duration - Math.floor(match.duration / 60) * 60)}
                      </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{match.kills} / {match.deaths} / {match.assists}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-8 mx-4">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
                                            <td className="px-6 py-4 whitespace-nowrap">
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
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{list.games}</td>
                                                              <td className="px-6 py-4 whitespace-nowrap">
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
            </div>
        </div>
    );
};

export default Player;
