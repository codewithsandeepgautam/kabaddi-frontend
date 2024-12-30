import React, { useState, useEffect, useMemo } from 'react';
import { GetRequest, PutRequest } from '../../utils/requests';

function TeamModal({ isModalOpen = "", setIsModalOpen = "" }) {
    const [teams1Data, setTeams1Data] = useState("");
    const [teams, setTeams] = useState([]);
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const getTeamsData = async () => {
        try {
            const response = await GetRequest(`${process.env.REACT_APP_URL}/teams`);
            setTeams(response?.data);
            setTeams1Data(response?.data[0]?.teamNameIst)
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };
    const handleUpdateData = async () => {
        try {
            const response = await PutRequest(
                `${process.env.REACT_APP_URL}/teams?id=${teams[0]._id}`, {
                teamNameIst: teams1Data,
            });
            closeModal()
            getTeamsData();
        } catch (error) {
            console.error('Error updating round:', error);
        }
    }
    useEffect(() => {
        getTeamsData();
    }, []);
    return (
        <div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
                    <div className="bg-white p-6 rounded-[4px]">
                        <div>
                            <label htmlFor="showBottomBodyNo" className=" text-black text-[18px] font-semibold"> Edit Team </label>
                            <input type='text' value={teams1Data} onChange={(e) => { setTeams1Data(e.target.value) }} className='py-2 px-3 text-black border border-[#000]' placeholder='name' />
                            <button className="mt-4 bg-[#0e1b6b] text-white py-2 px-8 rounded-[4px] mr-2" onClick={handleUpdateData}>OK</button>
                            <button className="mt-4 bg-[#b91c1c] text-white py-2 px-8 rounded-[4px] mr-2" onClick={closeModal}>Close</button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TeamModal
