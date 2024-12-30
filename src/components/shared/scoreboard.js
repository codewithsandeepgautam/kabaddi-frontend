import React, { useState, useEffect, useMemo, useContext, } from 'react'
import { GetRequest } from "../../utils/requests";
import { io } from "socket.io-client";
import { AccountContext } from '../../utils/accountContext';
function Scoreboard({ teamist = "", teamsec = "", roundsData = "", team1 = "", team2 = "" }) {
    const { teamsData } = useContext(AccountContext);
    const [data, setData] = useState([]);
    const socket = useMemo(
        () =>
            io("http://localhost:3023", {
                withCredentials: true,
            }),
        []
    );
    const settingsData = async () => {
        try {
            const response = await GetRequest(`${process.env.REACT_APP_URL}/settings`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };
    useEffect(() => {
        settingsData();
        socket.on("settingsUpdated", (updatesettings) => {
            settingsData();
        });
        return () => {
            socket.off("settingUpdated");
        };
    }, [socket]);
    const matchRound = data.filter((item) => item.matchRound !== undefined).map(item => item.matchRound);
    const matchRoundShow = data.filter((item) => item.matchRoundShow !== undefined).map(item => item.matchRoundShow);
    const scoreboard = data.filter((item) => item.scoreboardSetting !== undefined).map(item => item.scoreboardSetting);
    const SwapTeam = teamsData.some((item) => item.swapTeam === true);
    return (
        <div className="absolute top-0 left-0 p-2">
            {scoreboard.some((score) => score === true) && (
                <ul>
                    {SwapTeam === true ? (
                        <>
                            <li className="flex justify-end bg-[#fff] items-center rounded-[4px] mb-[6px]">
                                <h4 className="lg:text-[22px] md:text-[18px] px-3 font-semibold">{team1}</h4>
                                <span className="text-[22px] font-semibold bg-[#e91e26] text-white h-12 w-16 text-center flex justify-center items-center rounded-[4px]">
                                    {teamist}
                                </span>
                            </li>
                            <li className="flex justify-end bg-[#fff] items-center rounded-[4px] mb-[6px]">
                                <h4 className="lg:text-[22px] md:text-[18px] px-3 font-semibold">{team2}</h4>
                                <span className="text-[22px] font-semibold bg-[#e91e26] text-white h-12 w-16 text-center flex justify-center items-center rounded-[4px]">
                                    {teamsec}
                                </span>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="flex justify-end bg-[#fff] items-center rounded-[4px] mb-[6px]">
                                <h4 className="lg:text-[22px] md:text-[18px] px-3 font-semibold">{team2}</h4>
                                <span className="text-[22px] font-semibold bg-[#e91e26] text-white h-12 w-16 text-center flex justify-center items-center rounded-[4px]">
                                    {teamsec}
                                </span>
                            </li>
                            <li className="flex justify-end bg-[#fff] items-center rounded-[4px] mb-[6px]">
                                <h4 className="lg:text-[22px] md:text-[18px] px-3 font-semibold">{team1}</h4>
                                <span className="text-[22px] font-semibold bg-[#e91e26] text-white h-12 w-16 text-center flex justify-center items-center rounded-[4px]">
                                    {teamist}
                                </span>
                            </li>
                        </>
                    )}
                </ul>
            )}

            {matchRoundShow.some((round) => round === true) ? (
                <li className="flex justify-center text-white py-1 text-[22px]">
                    {matchRound}
                </li>
            ) : null}
        </div>
    )
}

export default Scoreboard
