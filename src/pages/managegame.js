import React, { useState, useEffect } from 'react';
import Layout from '../components/shared/Layout';
import { GetRequest, PutRequest } from '../utils/requests';
import { MdEditDocument } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoCheckboxSharp } from "react-icons/io5";
import Modal from '../components/modal/modal';
function ManageGame() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [settingData, setSettingData] = useState([]);
    const [showBottomBody, setShowBottomBody] = useState(false);
    const [scoreboard, setScoreboard] = useState(false);
    const [roundtext, setRoundtext] = useState("");
    const [roundShow, setRoundShow] = useState(false);
    const [mainScreen, setMainScreen] = useState("");
    const [mainScreenShow, setMainScreenShow] = useState(false);
    const [subtitle, setSubtitle] = useState("");
    const [subtitleShow, setSubtitleShow] = useState(false);
    const [bottomTitle, setBottomTitle] = useState("");
    const [bottomTitleShow, setBottomTitleShow] = useState(false);
    const [tab, setTab] = useState("Subtitles");
    const [image, setImage] = useState({ img: null, name: "" });
    const handleChange = (e) => {
        e.persist();
        const { name, value, type } = e.target;
        const newValue = (name === "img" && type === "file") ? e.target.files[0] : value;
        setImage((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };
    const getData = async () => {
        try {
            const response = await GetRequest(`${process.env.REACT_APP_URL}/settings`);
            setSettingData(response?.data);
            setShowBottomBody(response?.data[0].bottomBody);
            setScoreboard(response?.data[0].scoreboardSetting);
            setRoundShow(response?.data[0].matchRoundShow);
            setMainScreenShow(response?.data[0].mainScreenTitleShow);
            setSubtitleShow(response?.data[0].subtitleSettingShow);
            setBottomTitleShow(response?.data[0].bottomTitleSettingShow);
            setRoundtext(response?.data[0].matchRound);
            setMainScreen(response?.data[0].mainScreenTitle);
            setSubtitle(response?.data[0].subtitleSetting);
            setBottomTitle(response?.data[0].bottomTitleSetting);
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };
    const handleUpdateData = async () => {
        const formData = new FormData();
        formData.append("bottomBody", showBottomBody);
        formData.append("scoreboardSetting", scoreboard);
        formData.append("matchRound", roundtext);
        formData.append("matchRoundShow", roundShow);
        formData.append("mainScreenTitle", mainScreen);
        formData.append("mainScreenTitleShow", mainScreenShow);
        formData.append("subtitleSetting", subtitle);
        formData.append("subtitleSettingShow", subtitleShow);
        formData.append("bottomTitleSetting", bottomTitle);
        formData.append("bottomTitleSettingShow", bottomTitleShow);
        formData.append("imageShow", true);
        if (image.img) {
            formData.append('image', image.img);
        }
        try {
            const response = await PutRequest(
                `${process.env.REACT_APP_URL}/settings?id=${settingData[0]._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            );
            setIsModalOpen(true);
            getData();
        } catch (error) {
            console.error('Error updating round:', error);
        }
    }
    const handleDeleteImage = async () => {
        const formData = new FormData();
        if (image.img) {
            formData.append('image', "");
        }
        try {
            const response = await PutRequest(
                `${process.env.REACT_APP_URL}/settings?id=${settingData[0]?._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log("delete Img<<", response);
            setIsModalOpen(true);
            setImage({ img: null, name: "" });
            getData();
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };
    const handleShowImage = async () => {
        try {
            const response = await PutRequest(
                `${process.env.REACT_APP_URL}/settings?id=${settingData[0]?._id}`,
                {
                    imageShow: true
                },
            );
            setIsModalOpen(true);
            getData();
        } catch (error) {
            console.error('Error updating image:', error);
        }
    }
    const handleHideImage = async () => {
        try {
            const response = await PutRequest(
                `${process.env.REACT_APP_URL}/settings?id=${settingData[0]?._id}`,
                {
                    imageShow: false
                },
            );
            setIsModalOpen(true);
            getData();
        } catch (error) {
            console.error('Error updating image:', error);
        }

    }
    const handleShowSubtitle = async () => {
        try {
            const response = await PutRequest(
                `${process.env.REACT_APP_URL}/settings?id=${settingData[0]?._id}`,
                {
                    subtitleSettingShow: true
                },
            );
            setIsModalOpen(true);
            getData();
        } catch (error) {
            console.error('Error updating image:', error);
        }
    }
    const handleHideSubtitle = async () => {
        try {
            const response = await PutRequest(
                `${process.env.REACT_APP_URL}/settings?id=${settingData[0]?._id}`,
                {
                    subtitleSettingShow: false
                },
            );
            setIsModalOpen(true);
            getData();
        } catch (error) {
            console.error('Error updating image:', error);
        }

    }
    const handleDeleteSubtitle = async () => {
        try {
            const response = await PutRequest(
                `${process.env.REACT_APP_URL}/settings?id=${settingData[0]?._id}`,
                {
                    subtitleSetting: ""
                },
            );
            setIsModalOpen(true);
            setSubtitle("");
            getData();
        } catch (error) {
            console.error('Error updating image:', error);
        }

    }
    const handleShowRound = async () => {
        try {
            const response = await PutRequest(
                `${process.env.REACT_APP_URL}/settings?id=${settingData[0]?._id}`,
                {
                    matchRoundShow: true
                },
            );
            setIsModalOpen(true);
            getData();
        } catch (error) {
            console.error('Error updating image:', error);
        }
    }
    const handleHideRound = async () => {
        try {
            const response = await PutRequest(
                `${process.env.REACT_APP_URL}/settings?id=${settingData[0]?._id}`,
                {
                    matchRoundShow: false
                },
            );
            setIsModalOpen(true);
            getData();
        } catch (error) {
            console.error('Error updating image:', error);
        }
    }
    const handleDeleteRound = async () => {
        try {
            const response = await PutRequest(
                `${process.env.REACT_APP_URL}/settings?id=${settingData[0]?._id}`,
                {
                    matchRound: ""
                },
            );
            setIsModalOpen(true);
            setRoundtext("");
            getData();
        } catch (error) {
            console.error('Error updating image:', error);
        }
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-7">
                    <div className='w-full flex gap-4'>
                        <div className=' bg-white shadow-md rounded-[4px] mb-4 w-full'>
                            <div className="bg-gray-100 p-4 font-semibold">
                                Bottom Body Settings
                            </div>
                            <div className="p-4">
                                <div className="mb-4">
                                    <label htmlFor="showBottomBody" className="block text-sm font-medium text-gray-700">
                                        Bottom Body?
                                    </label>
                                    <div className="mt-2 flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="showBottomBody"
                                                value="show"
                                                checked={showBottomBody === true}
                                                onChange={() => setShowBottomBody(true)}
                                                className="form-radio text-[#13215c]"
                                            />
                                            <label htmlFor="showBottomBodyYes6" className="ml-2 text-sm text-gray-700">
                                                Show
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="showBottomBody"
                                                value="hide"
                                                checked={showBottomBody === false}
                                                onChange={() => setShowBottomBody(false)}
                                                className="form-radio text-red-500"
                                            />
                                            <label htmlFor="showBottomBodyNo5" className="ml-2 text-sm text-gray-700">
                                                Hide
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="w-full py-2 px-4 bg-[#13215c] text-white font-bold rounded-[4px]  focus:outline-none"
                                    onClick={handleUpdateData}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                        <div className=' bg-white shadow-md rounded-[4px] mb-4 w-full'>
                            <div className="bg-gray-100 p-4 font-semibold">
                                ScoreBoard Settings
                            </div>
                            <div className="p-4">
                                <div className="mb-4">
                                    <label htmlFor="showBottomBody" className="block text-sm font-medium text-gray-700">
                                        ScoreBoard?
                                    </label>
                                    <div className="mt-2 flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="scoreboard"
                                                value="show"
                                                checked={scoreboard === true}
                                                onChange={() => setScoreboard(true)}
                                                className="form-radio text-[#13215c]"
                                            />
                                            <label htmlFor="showBottomBodyYes" className="ml-2 text-sm text-gray-700">
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
                                            <label htmlFor="showBottomBodyNo4" className="ml-2 text-sm text-gray-700">
                                                Hide
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleUpdateData}
                                    className="w-full py-2 px-4 bg-[#13215c] text-white font-bold rounded-[4px]  focus:outline-none "
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex gap-4'>
                        <div className=' bg-white shadow-md rounded-[4px] mb-4 w-full'>
                            <div className="bg-gray-100 p-4 font-semibold">
                                Match Round Settings
                            </div>
                            <div className="p-4">
                                <div className="mb-4">
                                    <label htmlFor="showBottomBody" className="block text-sm font-medium text-gray-700 pb-2">
                                        Match Round?
                                    </label>
                                    <input type='text' value={roundtext} onChange={(e) => { setRoundtext(e.target.value) }} className='py-2 px-3 text-black' placeholder='enter round' />
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
                                            <label htmlFor="showBottomBodyYes" className="ml-2 text-sm text-gray-700">
                                                Show
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="roundShow"
                                                value="hide"
                                                checked={roundShow === false}
                                                onChange={() => setRoundShow(false)}
                                                className="form-radio text-red-500"
                                            />
                                            <label htmlFor="showBottomBodyNo3" className="ml-2 text-sm text-gray-700">
                                                Hide
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleUpdateData}
                                    className="w-full py-2 px-4 bg-[#13215c] text-white font-bold rounded-[4px]  focus:outline-none">
                                    Update
                                </button>
                            </div>
                        </div>
                        <div className=' bg-white shadow-md rounded-[4px] mb-4 w-full'>
                            <div className="bg-gray-100 p-4 font-semibold">
                                Main Screen Title Settings
                            </div>
                            <div className="p-4">
                                <div className="mb-4">
                                    <textarea rows="5" value={mainScreen} onChange={(e) => { setMainScreen(e.target.value) }} type="text" class="form-control h-[110px]" placeholder="खेलो विधानसभा वॉलीबॉल नाइट टूर्नामेंट तहसील ग्राउंड नोहटा"></textarea>
                                    <div className="mt-2 flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="mainScreenShow"
                                                value="show"
                                                checked={mainScreenShow === true}
                                                onChange={() => { setMainScreenShow(true) }}
                                                className="form-radio text-[#13215c]"
                                            />
                                            <label htmlFor="showBottomBodyYes" className="ml-2 text-sm text-gray-700">
                                                scroll
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="mainScreenShow"
                                                value="hide"
                                                checked={mainScreenShow === false}
                                                onChange={() => { setMainScreenShow(false) }}
                                                className="form-radio text-red-500"
                                            />
                                            <label htmlFor="showBottomBodyNo2" className="ml-2 text-sm text-gray-700">
                                                Stable
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleUpdateData}
                                    className="w-full py-2 px-4 bg-[#13215c] text-white font-bold rounded-[4px]  focus:outline-none "
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex gap-4'>
                        <div className=' bg-white shadow-md rounded-[4px] mb-4 w-full'>
                            <div className="bg-gray-100 p-4 font-semibold">
                                Sub Title Settings
                            </div>
                            <div className="p-4">
                                <div className="mb-4">
                                    <textarea rows="5" value={subtitle} onChange={(e) => { setSubtitle(e.target.value) }} id="matchScreenBottomTitle" type="text" class="form-control h-[110px]" placeholder=""></textarea>
                                    <div className="mt-2 flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="subtitleShow"
                                                value="show"
                                                checked={subtitleShow === true}
                                                onChange={(e) => { setSubtitleShow(true) }}
                                                className="form-radio text-[#13215c]"
                                            />
                                            <label htmlFor="showBottomBodyYes" className="ml-2 text-sm text-gray-700">
                                                scroll
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="subtitleShow"
                                                value="hide"
                                                checked={subtitleShow === false}
                                                onChange={(e) => { setSubtitleShow(false) }}
                                                className="form-radio text-red-500"
                                            />
                                            <label htmlFor="showBottomBodyNo" className="ml-2 text-sm text-gray-700">
                                                Stable
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleUpdateData}
                                    className="w-full py-2 px-4 bg-[#13215c] text-white font-bold rounded-[4px]  focus:outline-none "
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                        <div className=' bg-white shadow-md rounded-[4px] mb-4 w-full'>
                            <div className="bg-gray-100 p-4 font-semibold">
                                Bottom Title Settings
                            </div>
                            <div className="p-4">
                                <div className="mb-4">
                                    <textarea rows="5" value={bottomTitle} onChange={(e) => { setBottomTitle(e.target.value) }} id="matchScreenBottomTitle" type="text" class="form-control h-[110px]" placeholder=""></textarea>
                                    <div className="mt-2 flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="bottomTitleShow"
                                                value="show"
                                                checked={bottomTitleShow === true}
                                                onChange={() => setBottomTitleShow(true)}
                                                className="form-radio text-[#13215c]"
                                            />
                                            <label htmlFor="showBottomBodyYes" className="ml-2 text-sm text-gray-700">
                                                scroll
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="bottomTitleShow"
                                                value="no"
                                                checked={bottomTitleShow === false}
                                                onChange={() => setBottomTitleShow(false)}
                                                className="form-radio text-red-500"
                                            />
                                            <label htmlFor="showBottomBodyNo" className="ml-2 text-sm text-gray-700">
                                                Stable
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleUpdateData}
                                    className="w-full py-2 px-4 bg-[#13215c] text-white font-bold rounded-[4px]  focus:outline-none "
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex gap-4'>
                        <div className=' bg-white shadow-md rounded-[4px] mb-4 w-full'>
                            <div className="bg-gray-100 p-4 font-semibold">
                                Screen Image Settings
                            </div>
                            <div className="p-4">
                                <div className="mb-4">
                                    <img className='w-[200px]' src={settingData[0]?.image} alt='img' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-5 bg-white shadow-md rounded-[4px] mb-4">
                    <div className="bg-gray-100 p-4 font-semibold">
                        Settings
                    </div>
                    <div className="flex -mx-px p-4">
                        <button onClick={() => setTab("Subtitles")} className={`${tab === "Subtitles" ? "bg-[#b91c1c] text-[14px] py-2 px-5 inline-block mx-[6px] text-white rounded-sm" : "bg-[#13215c] py-2 px-5 inline-block mx-[6px] text-white rounded-sm"} `} >
                            Subtitles
                        </button>
                        <button onClick={() => setTab("Match")} className={`${tab === "Match" ? "bg-[#b91c1c] py-2 px-5 text-[14px] inline-block mx-[6px] text-white rounded-sm" : "bg-[#13215c] py-2 px-5 inline-block mx-[6px] text-white rounded-sm"} `} >
                            Match Rounds
                        </button>
                        <button onClick={() => setTab("Images")} className={`${tab === "Images" ? "bg-[#b91c1c] py-2 px-5 text-[14px] inline-block mx-[6px] text-white rounded-sm" : "bg-[#13215c] py-2 px-5 inline-block mx-[6px] text-white rounded-sm"} `} >
                            Images
                        </button>
                    </div>
                    <ul className="bg-white text-sm rounded-b p-4">
                        {tab === "Subtitles" && (
                            <div>
                                <li className='flex my-2'>
                                    <textarea rows="5" id="hello" type="text" class="form-control h-[110px]" value={subtitle}
                                        onChange={(e) => { setSubtitle(e.target.value) }} placeholder="subtitles"></textarea>
                                    <div className='text-left self-center'>
                                        <button className='text-white rounded-sm bg-[#3a70eb] py-1 px-2 m-1' onClick={handleHideSubtitle}> <MdEditDocument className='inline-block mr-[4px] text-[20px]' />Hide subtitle</button>
                                        <button className='text-white rounded-sm bg-[#b91c1c] py-1 px-2 m-1' onClick={handleDeleteSubtitle}><MdDelete className='inline-block mr-[4px] text-[20px]' />Delete</button>
                                        <button className='text-white rounded-sm bg-[#13215c] py-1 px-2 m-1' onClick={handleShowSubtitle}><IoCheckboxSharp className='inline-block mr-[4px] text-[20px]' />Set Sub Title</button>
                                    </div>
                                </li>
                                <div>
                                    <button className='text-white rounded-sm bg-[#13215c] text-[17px] py-2 px-12 m-1 inline-block' onClick={handleUpdateData}>Add Subtitle</button>
                                </div>
                            </div>
                        )}
                        {tab === "Match" && (
                            <li>
                                <div>
                                    <div>
                                        <p className='font-semibold text-[16px] pt-2'>Create a Match Round</p>
                                        <li className='flex my-2'>
                                            <textarea rows="5" id="hello9" type="text" class="form-control h-[110px]" placeholder="round" value={roundtext} onChange={(e) => { setRoundtext(e.target.value) }}></textarea>
                                            <div className='text-left self-center'>
                                                <button className='text-white rounded-sm bg-[#3a70eb] py-1 px-2 m-1' onClick={handleHideRound}> <MdEditDocument className='inline-block mr-[4px] text-[20px]' />Hide Round</button>
                                                <button className='text-white rounded-sm bg-[#b91c1c] py-1 px-2 m-1' onClick={handleDeleteRound}><MdDelete className='inline-block mr-[4px] text-[20px]' />Delete</button>
                                                <button className='text-white rounded-sm bg-[#13215c] py-1 px-2 m-1' onClick={handleShowRound}><IoCheckboxSharp className='inline-block mr-[4px] text-[20px]' />Set Screen Round</button>
                                            </div>
                                        </li>
                                        <button className='text-white rounded-sm bg-[#13215c] text-[17px] py-2 px-12 m-1 inline-block' onClick={handleUpdateData}>Add Round</button>
                                    </div>
                                </div>
                            </li>
                        )}
                        {tab === "Images" && (
                            <li>
                                <div>
                                    <p className='font-semibold text-[16px] pt-2'>Add a new image</p>
                                    <li className='flex my-2'>
                                        <textarea rows="5" id="hello10" type="text" class="form-control h-[110px]" placeholder="hello10" value={image.name}
                                        ></textarea>
                                        <div className='text-left self-center'>
                                            <button className='text-white rounded-sm bg-[#3a70eb] py-1 px-2 m-1' onClick={handleHideImage}> <MdEditDocument className='inline-block mr-[4px] text-[20px]' />Hide Image</button>
                                            <button className='text-white rounded-sm bg-[#b91c1c] py-1 px-2 m-1' onClick={handleDeleteImage}><MdDelete className='inline-block mr-[4px] text-[20px]' />Delete</button>
                                            <button className='text-white rounded-sm bg-[#13215c] py-1 px-2 m-1' onClick={handleShowImage}><IoCheckboxSharp className='inline-block mr-[4px] text-[20px]' />Set Screen Img</button>
                                        </div>
                                    </li>
                                    <button className='text-white rounded-sm bg-[#13215c] text-[17px] py-2 px-12 m-1 inline-block' onClick={handleUpdateData}>Add Image</button>
                                    <input type='file' accept="image/png, image/jpg, image/jpeg,image/svg,image/webp" name="img" className='text-white rounded-sm bg-[#b91c1c] text-[17px] py-2 px-12 m-1 inline-block' onChange={handleChange} />
                                </div>
                            </li>
                        )}
                    </ul>
                    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                </div>
            </div>
        </Layout>
    );
}

export default ManageGame;
