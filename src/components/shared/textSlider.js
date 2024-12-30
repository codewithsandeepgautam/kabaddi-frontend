import React, { useState, useEffect, useMemo } from 'react';
import { io } from "socket.io-client";
import { GetRequest } from "../../utils/requests";

function TextSlider() {
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
            socket.off("settingsUpdated");
        };
    }, [socket]);

    const mainScreenTitle = data.filter((item) => item.mainScreenTitle !== undefined).map(item => item.mainScreenTitle);
    const mainScreenTitleShow = data.some((item) => item.mainScreenTitleShow === true);
    const bottomBodyShow = data.some((item) => item.bottomBody === true);
    const BottomTitleSetting = data.filter((item) => item.bottomTitleSetting !== undefined).map(item => item.bottomTitleSetting);
    const BottomTitleSettingShow = data.some((item) => item.bottomTitleSettingShow === true);
    const SubtitleSetting = data.filter((item) => item.subtitleSetting !== undefined).map(item => item.subtitleSetting);
    const SubtitleSettingShow = data.some((item) => item.subtitleSettingShow === true);
    const tournamentImage = data.filter((item) => item.image !== undefined).map(item => item.image);
    const ImageShow = data.some((item) => item.imageShow === true);
    console.log("bottomBodyShow<<", bottomBodyShow);
    return (
        <div className="absolute left-0 right-0 bottom-0 bg-[#ddd]">
            {bottomBodyShow ? (<div className="relative text-xl text-white overflow-hidden lg:h-[100px] h-[83px] md:h-[84px]">
                <div
                    className="bg-[#990000] absolute top-0 bottom-0 z-10 lg:text-[68px] md:text-[48px] text-[40px] flex justify-center uppercase px-[28px] lg:px-[68px] md:px-[48px] items-center rounded-r-[10px] border-r-6 border-white shadow-[10px_0px_0px_0px_#fff]"
                >
                    Live
                    <span className="relative flex h-3 w-3 lg:mt-[-60px] md:mt-[-32px] mt-[-40px]">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F44336]"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F44336]"></span>
                    </span>
                </div>
                <div
                    className={`whitespace-nowrap lg:py-1  lg:text-[24px] md:text-[18px] text-[12px] text-black w-full font-[600] ${mainScreenTitleShow ? 'animate-[marquee_46s_linear_infinite]' : ''
                        }`}
                >
                    <i><p className='inline-block'>{mainScreenTitle}</p></i>
                </div>
                <div className="bg-[#fff] text-black text-center text-[16px] font-semibold"><p className={`inline-block ${SubtitleSettingShow ? 'animate-[marquee_46s_linear_infinite]' : ''
                    }`}>{SubtitleSetting}</p></div>
                <div className={`whitespace-nowrap lg:py-1 lg:text-[24px] md:text-[18px] text-[12px] text-black w-full font-[600] ${BottomTitleSettingShow ? 'animate-[marquee_46s_linear_infinite]' : ''
                    }`}>
                    <i><p className='inline-block'>{BottomTitleSetting}</p></i>
                </div>
            </div>
            ) : null}
            {tournamentImage[0] !== '' && ImageShow ? (
                <img className='bg-[#990000] text-white absolute right-0 bottom-0 lg:w-[200px] md:w-[120px] w-[100px] object-cover flex justify-between items-center text-center lg:h-[100px] h-[83px] md:h-[84px] rounded-l-[10px] shadow-[-10px_0px_0px_0px_#fff]' src={tournamentImage[0]} alt="tournament-image" />
            ) : null}
        </div>
    );
}

export default TextSlider;

