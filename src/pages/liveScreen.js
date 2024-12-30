import React, { useState, useEffect, useMemo } from 'react';
import video from "../assets/images/livescreen.mp4";
import watermarklogo from "../assets/images/logo.png";
import logogif from "../assets/images/logo.png";
import icon1 from "../assets/images/whatsapp.png";
import icon2 from "../assets/images/calendar.png";
import Scoreboard from '../components/shared/scoreboard';
import { GetRequest } from "../utils/requests.js";
import { io } from "socket.io-client";
import TextSlider from '../components/shared/textSlider.js';
function LiveScreen() {
    const [data, setData] = useState([]);
    const [teams, setTeams] = useState([]);
    const [date, setdate] = useState(new Date());
    const socket = useMemo(
        () =>
            io("http://localhost:3023", {
                withCredentials: true,
            }),
        []
    );
    const getScoresData = async () => {
        try {
            const response = await GetRequest(`${process.env.REACT_APP_URL}/score`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };
    const getTeamsData = async () => {
        try {
            const response = await GetRequest(`${process.env.REACT_APP_URL}/teams`);
            setTeams(response?.data);
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };
    useEffect(() => {
        getTeamsData();
        getScoresData();
        socket.on("connect", () => {
            console.log("Socket connected with ID:", socket.id);
        });
        socket.on("scoreUpdated", (updatedScore) => {
            getScoresData();
            setData((prevData) =>
                prevData.map((item) =>
                    item._id === updatedScore._id ? updatedScore : item
                )
            );
        });
        socket.on("teamsUpdated", (updateteam) => {
            getTeamsData();
        });
        socket.on("scoreReset", (resetData) => {
            getScoresData();
        })
        return () => {
            socket.off("scoreUpdated");
        };
    }, [socket]);
    const teamIst = data.filter((item) => item.team1Score !== undefined).map(item => item.team1Score);
    const teamsec = data.filter((item) => item.team2Score !== undefined).map(item => item.team2Score);
    const team1 = teams.filter((item) => item.teamNameIst !== undefined).map(item => item.teamNameIst);
    const team2 = teams.filter((item) => item.teamNameSec !== undefined).map(item => item.teamNameSec);
    useEffect(() => {
        const dateData = new Date();
        setdate(dateData);
    }, []);

    return (
        <div className="relative h-screen w-full">
            <video controls autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover">
                <source src={video} type="video/mp4" />
                <source src={video} type="video/ogg" />
            </video>
            <div className="absolute top-0 left-0 right-0 w-full h-full flex items-center opacity-30 watermark-animation">
                <img src={watermarklogo} alt="Watermark" className="max-w-[120px] max-h-[100px] object-contain" />
            </div>
            <TextSlider />
            <div>
                <Scoreboard teamist={teamIst} teamsec={teamsec} roundsData="final" team1={team1} team2={team2} />
                <div
                    className="absolute bg-[#fff] opacity-60 rounded-tl-[40px] right-0 lg:bottom-[100px] md:bottom-[84px] bottom-[83px] p-1 lg:p-4 md:p-1 flex items-center justify-center space-x-2">
                    <div className="flex items-center justify-center pl-2">
                        <img className="lg:w-6 lg:h-6 md:w-6 md:h-6 h-5 w-5" src={icon1} alt="icon" />
                        <span className="lg:text-[22px] md:text-[12px] text-[12px] font-semibold text-[#000] pl-3">+91
                            62841-50911</span>
                    </div>
                    <div className="flex items-center justify-center px-2">
                        <img className="lg:w-6 lg:h-6 md:w-6 md:h-6 h-5 w-5" src={icon2} alt="icon" />
                        <span className="lg:text-[22px] md:text-[12px] text-[12px] font-semibold text-[#000] pl-3">{date.toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
            <div className="absolute top-0 right-0 p-2">
                <img className="lg:w-[150px] w-[60px] bg-[#ffffffba] p-2 md:w-[100px] rounded-[2px]" src={logogif}
                    alt="logo" />
            </div>
        </div>
    );
}

export default LiveScreen;
