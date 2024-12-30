import React, { useState, useEffect, useMemo } from 'react';
import { GetRequest, PutRequest } from '../../utils/requests';

function TeamSecModal({ isModalOpenSec = "", setIsModalOpenSec = "" }) {
    const [teams2Data, setTeams2Data] = useState("");
    const [teams, setTeams] = useState([]);
    const closeModal = () => {
        setIsModalOpenSec(false);
    };
    const handleUpdateData = async () => {
        try {
            const response = await PutRequest(
                `${process.env.REACT_APP_URL}/teams?id=${teams[0]._id}`, {
                teamNameSec: teams2Data,
            }
            );
            getTeamsData();
            closeModal()
        } catch (error) {
            console.error('Error updating teams:', error);
        }
    }
    const getTeamsData = async () => {
        try {
            const response = await GetRequest(`${process.env.REACT_APP_URL}/teams`);
            setTeams(response?.data);
            setTeams2Data(response?.data[0]?.teamNameSec);
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };
    useEffect(() => {
        getTeamsData();
    }, []);
    return (
        <div>
            {isModalOpenSec && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
                    <div className="bg-white p-6 rounded-[4px]">
                        <div>
                            <label htmlFor="showBottomBodyNo" className=" text-black text-[18px] font-semibold"> Edit Team </label>
                            <input type='text' value={teams2Data} onChange={(e) => { setTeams2Data(e.target.value) }} className='py-2 px-3 text-black border border-[#000]' placeholder='name' />
                            <button className="mt-4 bg-[#0e1b6b] text-white py-2 px-8 rounded-[4px] mr-2" onClick={handleUpdateData}>OK</button>
                            <button className="mt-4 bg-[#b91c1c] text-white py-2 px-8 rounded-[4px] mr-2" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TeamSecModal
