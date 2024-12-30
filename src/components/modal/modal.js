import React from 'react';
import check from "../../assets/icons/checkmark.png";

function Modal({ isModalOpen = "", setIsModalOpen = "" }) {
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-[6px] shadow-xl max-w-md w-full">
                        <div className="text-center">
                            <img className="h-16 w-16 mx-auto" src={check} alt="Success Icon" />
                            <h2 className="text-3xl font-semibold text-gray-800 mt-4">Success</h2>
                            <p className="text-lg text-gray-600 mt-2">Data updated successfully!</p>
                            <button
                                className="mt-6 bg-[#0e1b6b] text-white py-2 px-8 rounded-lg hover:bg-[#0c174f] transition duration-300"
                                onClick={closeModal}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}

export default Modal
