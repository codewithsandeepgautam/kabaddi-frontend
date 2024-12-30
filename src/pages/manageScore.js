import React, { useState, useEffect } from 'react';
import Layout from '../components/shared/Layout';
import { CiSquareChevUp } from "react-icons/ci";
import { GetRequest, PutRequest } from "../utils/requests";

function ManageScore() {
  const [data, setData] = useState([]);
  const [roundsData, setRoundsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [textData, setTextData] = useState({
    slideTextist: "",
    slideTextsec: ""
  })
  const getProductsData = async () => {
    try {
      const response = await GetRequest(`${process.env.REACT_APP_URL}/score`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    } finally {
      setLoading(false);
    }
  };
  const getRoundsData = async () => {
    try {
      const response = await GetRequest(`${process.env.REACT_APP_URL}/rounds`);
      setRoundsData(response.data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };
  useEffect(() => {
    getRoundsData();
    getProductsData();
  }, []);
  const getUpdateScoreTeamist = async () => {
    if (data.length === 0) return;
    const team1Score = data[0]?.team1Score || 0;
    try {
      const updatedData = { team1Score: team1Score + 1 };
      const response = await PutRequest(`${process.env.REACT_APP_URL}/score?id=${data[0]._id}`, updatedData);
      getProductsData();
    } catch (error) {
      console.error('Error updating score for Team 1:', error);
    }
  };
  const getUpdateScoreTeamSec = async () => {
    if (data.length === 0) return;
    const team2Score = data[0]?.team2Score || 0;
    try {
      const updatedData = { team2Score: team2Score + 1 };
      const response = await PutRequest(`${process.env.REACT_APP_URL}/score?id=${data[0]._id}`, updatedData);
      getProductsData();
    } catch (error) {
      console.error('Error updating score for Team 2:', error);
    }
  };
  const handleTextUpdateIst = async () => {
    if (!textData.slideTextist) return;
    try {
      const updatedData = { textSliderIst: textData.slideTextist };
      const response = await PutRequest(
        `${process.env.REACT_APP_URL}/score?id=${data[0]._id}`,
        updatedData
      );
      getProductsData();
    } catch (error) {
      console.error('Error updating score for Team 1:', error);
    }
  };

  const handleTextUpdateSec = async (e) => {
    if (!textData.slideTextist) return;
    try {
      const updatedData = { textSliderSec: textData.slideTextsec };
      const response = await PutRequest(
        `${process.env.REACT_APP_URL}/score?id=${data[0]._id}`,
        updatedData
      );
      getProductsData();
    } catch (error) {
      console.error('Error updating score for Team 1:', error);
    }
  }
  const handleRounds = async (id) => {
    try {
      const response = await PutRequest(
        `${process.env.REACT_APP_URL}/score?id=${data[0]._id}`,
        { roundsId: id }
      );
      console.log("responseRounds<<", response);
      getProductsData();
    } catch (error) {
      console.error('Error updating round:', error);
    }
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  const team1Score = data[0]?.team1Score || 0;
  const team2Score = data[0]?.team2Score || 0;
  return (
    <Layout>
      <h1>Manage Score</h1>
      <div className='w-full flex'>
        <div className='border p-2 mr-4 rounded-[4px]'>
          <h3 className='font-normal'>{team1Score}</h3>
          <div className='flex bg-[#edf2f6] rounded-[4px] py-1 px-2 items-center text-center justify-between  border border-[#0e1b6b] focus:border-[#0e1b6b] focus:outline-none'>
            <h3 className='m-0 font-semibold pr-3 text-[18px]'>Himachal</h3>
            <button onClick={getUpdateScoreTeamist}><CiSquareChevUp className='inline-block text-[38px] text-[#0e1b6b]' /></button>
          </div>
        </div>
        <div className='border p-2 mr-4 rounded-[4px]'>
          <h3 className='font-normal'>{team2Score}</h3>
          <div className='flex bg-[#edf2f6] rounded-[4px] py-1 px-2 items-center text-center justify-between  border border-[#0e1b6b] focus:border-[#0e1b6b] focus:outline-none'>
            <h3 className='m-0 font-semibold pr-3 text-[18px]'>Punjab</h3>
            <button onClick={getUpdateScoreTeamSec}><CiSquareChevUp className='inline-block text-[38px] text-[#0e1b6b]' /></button>
          </div>
        </div>
        <div className='border p-2 rounded-[4px]'>
          <h3 className='font-normal'>Rounds</h3>
          <select id="rounds" className=" bg-[#edf2f6] text-[#000] text-md rounded-[4px] p-2.5 border border-[#0e1b6b] focus:border-[#0e1b6b] focus:outline-none" onChange={(e) => { handleRounds(e.target.value) }}>
            <option>Select Round</option>
            {roundsData?.map((item, index) => {
              return (
                <option key={index} value={item?._id}>{item?.rounds}</option>
              )
            })}
          </select>
        </div>
      </div>
      <div className='pt-[42px]'>
        <h5 className='font-normal'>Breaking News</h5>
        <textarea id="message" rows="4" value={textData.slideTextist} onChange={(event) => {
          setTextData((prev) => ({
            ...prev,
            slideTextist: event.target.value
          }));
        }} onBlur={handleTextUpdateIst} className="lg:w-[580px] bg-[#edf2f6]  h-[110px] mb-2 block p-2.5 w-full text-[18px] text-[#000] border border-[#0e1b6b]" placeholder="News here..."></textarea>
        <textarea id="message" rows="4" onChange={(event) => {
          setTextData((prev) => ({
            ...prev,
            slideTextsec: event.target.value
          }));
        }} onBlur={handleTextUpdateSec} className="lg:w-[580px] bg-[#edf2f6]  h-[110px] block p-2.5 w-full text-[18px] text-[#000] border border-[#0e1b6b]" placeholder="News here..."></textarea>
      </div>
    </Layout>
  );
}

export default ManageScore;
