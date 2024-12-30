import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../components/shared/Layout';
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { GetRequest, PutRequest } from '../utils/requests';
import TeamModal from '../components/modal/teamModal';
import TeamSecModal from '../components/modal/teamsecModal';
import { Link } from 'react-router-dom';
import Modal from '../components/modal/modal';
import { io } from "socket.io-client";

function EditScoreOpposite() {
  const socket = useMemo(
    () =>
      io("http://localhost:3023", {
        withCredentials: true,
      }),
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSec, setIsModalOpenSec] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scores, setScores] = useState([]);
  const [teams, setTeams] = useState([]);
  const [setting, setSettings] = useState([]);
  const [scoreboard, setScoreboard] = useState(false);
  const [roundtext, setRoundtext] = useState("");
  const [roundShow, setRoundShow] = useState(false);
  const [teamsSwapped, setTeamsSwapped] = useState(false);
  const [isFirstWin, setIsFirstWin] = useState(true);

  const getScoresData = async () => {
    try {
      const response = await GetRequest(`${process.env.REACT_APP_URL}/score`);
      setScores(response?.data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };
  const getSettingsData = async () => {
    try {
      const response = await GetRequest(`${process.env.REACT_APP_URL}/settings`);
      setSettings(response?.data);
      setScoreboard(response?.data[0]?.scoreboardSetting)
      setRoundtext(response?.data[0]?.matchRound)
      setRoundShow(response?.data[0]?.matchRoundShow)
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };
  const getTeamsData = async () => {
    try {
      const response = await GetRequest(`${process.env.REACT_APP_URL}/teams`);
      setTeams(response?.data);
      setTeamsSwapped(response?.data[0]?.swapTeam);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const handleResetScores = async () => {
    const team1Score = scores[0]?.team1Score || 0;
    const team2Score = scores[0]?.team2Score || 0;
    try {
      const response = await PutRequest(
        `${process.env.REACT_APP_URL}/score/reset?id=${scores[0]._id}`,
        {
          team1Score: team1Score * 0,
          team2Score: team2Score * 0
        }
      );
      getScoresData();
      setIsOpen(true);
      setIsFirstWin(true);
    } catch (error) {
      console.error('Error resetting scores:', error);
    }
  };

  const handleUpdateData = async () => {
    try {
      const response = await PutRequest(
        `${process.env.REACT_APP_URL}/settings?id=${setting[0]._id}`, {
        scoreboardSetting: scoreboard,
        matchRound: roundtext,
        matchRoundShow: roundShow
      }
      );
      getSettingsData();
      setIsOpen(true);
    } catch (error) {
      console.error('Error updating round:', error);
    }
  }
  const handleUpdateTeamsData = () => {
    setIsModalOpen(true);
  }
  const handleUpdateTeams = () => {
    setIsModalOpenSec(true);
  }
  const getUpdateScoreTeamist = async () => {
    if (scores.length === 0) return;
    let team1Score = scores[0]?.team1Score || 0;
    if (isFirstWin) {
      team1Score += 1.5;
    } else {
      team1Score += 1;
    }
    setIsFirstWin(false);
    try {
      const response = await PutRequest(`${process.env.REACT_APP_URL}/score?id=${scores[0]._id}`, {
        team1Score,
      });
      getScoresData();
    } catch (error) {
      console.error('Error updating score for Team 1:', error);
    }
  };
  const getUpdateScoreTeamSec = async () => {
    if (scores.length === 0) return;
    let team2Score = scores[0]?.team2Score || 0;
    if (isFirstWin) {
      team2Score += 1.5;
    } else {
      team2Score += 1;
    }
    setIsFirstWin(false);
    try {
      const response = await PutRequest(`${process.env.REACT_APP_URL}/score?id=${scores[0]._id}`, {
        team2Score,
      });
      getScoresData();
    } catch (error) {
      console.error('Error updating score for Team 2:', error);
    }
  };
  const getUpdateScoreMinusTeamIst = async () => {
    if (scores.length === 0) return;
    const team1Score = scores[0]?.team1Score || 0;
    if (team1Score === 1.5) return 0;
    if (team1Score <= 0) return 0;
    try {
      const response = await PutRequest(`${process.env.REACT_APP_URL}/score?id=${scores[0]._id}`,
        {
          team1Score: team1Score - 1
        }
      );
      getScoresData();
    } catch (error) {
      console.error('Error updating score for Team 1:', error);
    }
  };
  const getUpdateScoreMinusTeamSec = async () => {
    if (scores.length === 0) return;
    const team1Score2 = scores[0]?.team2Score || 0;
    if (team1Score2 === 1.5) return 0;
    if (team1Score2 <= 0) return 0;
    try {
      const response = await PutRequest(`${process.env.REACT_APP_URL}/score?id=${scores[0]._id}`,
        {
          team2Score: team1Score2 - 1
        }
      );
      getScoresData();
    } catch (error) {
      console.error('Error updating score for Team 1:', error);
    }
  };
  const handleChangeTeams = async () => {
    const newTeamsSwapped = !teamsSwapped;
    setTeamsSwapped(newTeamsSwapped);
    try {
      const response = await PutRequest(
        `${process.env.REACT_APP_URL}/teams?id=${teams[0]._id}`, {
        swapTeam: newTeamsSwapped
      });
      setIsOpen(true);
    } catch (error) {
      console.error('Error updating teams swap state:', error);
    }
  };
  useEffect(() => {
    setIsFirstWin(false);
    getScoresData();
    getTeamsData();
    getSettingsData();
    socket.on("teamsUpdated", (updateteam) => {
      getTeamsData();
    });
  }, [socket]);
  return (
    <Layout>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamsSwapped ? (
            <div className="border border-[#ddd] rounded-[4px] p-4">
              <div>
                <h2 className="text-[20px] font-semibold flex items-center">
                  {teams[0]?.teamNameIst}
                  <button onClick={handleUpdateTeamsData}>
                    <FiEdit className='text-[#b91c1c] ml-2 inline-block' />
                  </button>
                </h2>
              </div>
              <h2 className="text-[48px] font-semibold">{scores[0]?.team1Score}</h2>
              <div className='gap-2 bg-[#e7e7e7] inline-block py-1.5 px-4 rounded-sm'>
                <button className='mr-3' onClick={getUpdateScoreTeamist}>
                  <FiPlusCircle className='inline-block text-[#b91c1c] text-[46px]' />
                </button>
                <button onClick={getUpdateScoreMinusTeamIst}>
                  <FiMinusCircle className='inline-block text-[#0e1b6b] text-[46px]' />
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-[#ddd] rounded-[4px] p-4">
              <div>
                <h2 className="text-[20px] font-semibold flex items-center">
                  {teams[0]?.teamNameSec}
                  <button onClick={handleUpdateTeams}>
                    <FiEdit className='text-[#b91c1c] ml-2 inline-block' />
                  </button>
                </h2>
              </div>
              <h2 className="text-[48px] font-semibold">{scores[0]?.team2Score}</h2>
              <div className='gap-2 bg-[#e7e7e7] inline-block py-1.5 px-4 rounded-sm'>
                <button className='mr-3' onClick={getUpdateScoreTeamSec}>
                  <FiPlusCircle className='inline-block text-[#0e1b6b] text-[46px]' />
                </button>
                <button onClick={getUpdateScoreMinusTeamSec}>
                  <FiMinusCircle className='inline-block text-[#b91c1c] text-[46px]' />
                </button>
              </div>
            </div>
          )}
          {!teamsSwapped ? (
            <div className="border border-[#ddd] rounded-[4px] p-4">
              <div>
                <h2 className="text-[20px] font-semibold flex items-center">
                  {teams[0]?.teamNameIst}
                  <button onClick={handleUpdateTeamsData}>
                    <FiEdit className='text-[#b91c1c] ml-2 inline-block' />
                  </button>
                </h2>
              </div>
              <h2 className="text-[48px] font-semibold">{scores[0]?.team1Score}</h2>
              <div className='gap-2 bg-[#e7e7e7] inline-block py-1.5 px-4 rounded-sm'>
                <button className='mr-3' onClick={getUpdateScoreTeamist}>
                  <FiPlusCircle className='inline-block text-[#b91c1c] text-[46px]' />
                </button>
                <button onClick={getUpdateScoreMinusTeamIst}>
                  <FiMinusCircle className='inline-block text-[#0e1b6b] text-[46px]' />
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-[#ddd] rounded-[4px] p-4">
              <div>
                <h2 className="text-[20px] font-semibold flex items-center">
                  {teams[0]?.teamNameSec}
                  <button onClick={handleUpdateTeams}>
                    <FiEdit className='text-[#b91c1c] ml-2 inline-block' />
                  </button>
                </h2>
              </div>
              <h2 className="text-[48px] font-semibold">{scores[0]?.team2Score}</h2>
              <div className='gap-2 bg-[#e7e7e7] inline-block py-1.5 px-4 rounded-sm'>
                <button className='mr-3' onClick={getUpdateScoreTeamSec}>
                  <FiPlusCircle className='inline-block text-[#0e1b6b] text-[46px]' />
                </button>
                <button onClick={getUpdateScoreMinusTeamSec}>
                  <FiMinusCircle className='inline-block text-[#b91c1c] text-[46px]' />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className='text-center p-4'>
          <div className="flex items-center justify-center space-x-4 my-4">
            <div className="flex items-center">
              <input
                type="radio"
                name="scoreboard"
                value="show"
                checked={scoreboard === true}
                onChange={() => setScoreboard(true)}
                className="form-radio text-[#13215c]"
              />
              <label htmlFor="showBottomBodyYes6" className="ml-2 text-sm text-gray-700">
                Show
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="scoreboard"
                value="hide"
                checked={scoreboard === false}
                onChange={() => setScoreboard(false)}
                className="form-radio text-red-500"
              />
              <label htmlFor="showBottomBodyNo5" className="ml-2 text-sm text-gray-700">
                Hide
              </label>
            </div>
            <button type="submit" class="py-2 px-6 bg-[#575757] text-white  rounded-[4px] focus:outline-none" onClick={handleUpdateData}>Update</button>
          </div>
          <button class="py-2 px-6 bg-[#3a70eb] text-white  rounded-[4px] m-1 focus:outline-none" onClick={handleResetScores}>Reset Scores</button>
          <button class="py-2 px-6 bg-[#b91c1c] text-white  rounded-[4px] m-1 focus:outline-none" onClick={handleChangeTeams}>Change Teams</button>
          <button class="py-2 px-6 bg-[#13215c] text-white  rounded-[4px] m-1 focus:outline-none"><Link to="/editscorecamera">Camera View</Link></button>
        </div>
        <div className='lg:w-[50%] md:w-[50%] w-full bg-white shadow-md rounded-[4px] mb-4 w-full'>
          <div className="bg-gray-100 p-4 font-semibold">
            Match Type Settings
          </div>
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="showBottomBody" className="block text-sm font-medium text-gray-700">
                <input type='text' value={roundtext} onChange={(e) => { setRoundtext(e.target.value) }} className='py-2 px-3 text-black border border-[#000]' placeholder='enter round' />
              </label>
              <div className="mt-2 flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="roundShow"
                    value="show"
                    checked={roundShow === true}
                    onChange={() => setRoundShow(true)}
                    className="form-radio text-[#13215c]"
                  />
                  <label htmlFor="showBottomBodyYes6" className="ml-2 text-sm text-gray-700">
                    Show
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="roundShow"
                    value="hide"
                    checked={roundShow === false}
                    onChange={() => { setRoundShow(false) }}
                    className="form-radio text-red-500"
                  />
                  <label htmlFor="showBottomBodyNo5" className="ml-2 text-sm text-gray-700">
                    Hide
                  </label>
                </div>
              </div>
            </div>
            <button
              className="py-2 px-6 bg-[#13215c] text-white  rounded-[4px]  focus:outline-none" onClick={handleUpdateData}
            >
              Update
            </button>
          </div>
        </div>
        <Modal isModalOpen={isOpen} setIsModalOpen={setIsOpen} />
        <TeamModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <TeamSecModal isModalOpenSec={isModalOpenSec} setIsModalOpenSec={setIsModalOpenSec} />
      </div>
    </Layout>
  );
}
export default EditScoreOpposite;