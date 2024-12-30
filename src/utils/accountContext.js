import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';
import { io } from "socket.io-client";

export const AccountContext = createContext();
export const AccountProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [settingData, setSettingData] = useState([]);
  const [teamAId, setTeamAId] = useState("");
  const [teamBId, setTeamBId] = useState("");
  const [gameId, setGameId] = useState("");
  const [subtitletxt, setSubtitletxt] = useState("");
  const [teamsData, setTeamsData] = useState([]);
  const [scoresData, setScoresData] = useState([]);
  const [types, setTypes] = useState([]);

  const socket = useMemo(
    () =>
      io("http://localhost:3023", {
        withCredentials: true,
      }),
    []
  );
  const data = {
    login,
    setLogin,
    userData,
    setUserData,
    settingData,
    setSettingData,
    gameId,
    setGameId,
    teamAId,
    setTeamAId,
    teamBId,
    setTeamBId,
    subtitletxt,
    setSubtitletxt,
    teamsData,
    setTeamsData,
    types,
    setTypes,
    scoresData,
    setScoresData,
  };
  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/settings`);
      setSettingData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getTeamsData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/teams`);
      setTeamsData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getScoresData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/score`);
      setScoresData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getTypesData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/types`);
      setTypes(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    getData();
    getTeamsData();
    getScoresData();
    socket.on("settingsUpdated", (updatesettings) => {
      getData();
      console.log("settings updated:", updatesettings);
    });
    socket.on("teamsUpdated", (updateteam) => {
      getTeamsData();
      console.log("team updated:", updateteam);

    });
    socket.on("scoreUpdated", (updatedScore) => {
      getScoresData();
    });
    socket.on("scoreReset", (resetData) => {
      getScoresData();
  })
    return () => {
      socket.off("settingsUpdated");
    };
  }, [socket]);
  useEffect(() => {
    getTypesData();
  }, []);
  useEffect(() => {
    const storedLogin = localStorage.getItem("login");
    if (storedLogin && storedLogin === "true") {
      setLogin(true);
    }
  }, []);
  return (
    <AccountContext.Provider value={data}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  return useContext(AccountContext);
};
