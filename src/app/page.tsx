import React from 'react';
import { FaUserFriends, FaRegAddressCard } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="relative h-56 bg-cover bg-center" style={{ backgroundImage: `url('/your-event-banner.jpg')` }}>
        <div className="absolute inset-0 bg-black  bg-opacity-40 flex flex-col justify-end p-4">
          <h1 className="text-white text-2xl font-bold">CLOUD CAM</h1>
          <p className="text-white text-sm"></p>
        </div>
      </div>

      {/* Question */}
      <div className="text-center p-6 flex-1 flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold text-gray-800">Who are you?</h2>
        <p className="text-gray-500 mt-1">Please select your role below</p>

        <div className="flex justify-center mt-6 space-x-6">
          {/* Host Card */}
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-4 rounded-2xl shadow-md flex flex-col items-center transition">
            <FaRegAddressCard size={30} />
            <span className="mt-2 font-semibold">I’m the Host</span>
          </button>

          {/* Guest Card */}
          <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-4 rounded-2xl shadow-md flex flex-col items-center transition">
            <FaUserFriends size={30} />
            <span className="mt-2 font-semibold">I’m a Guest</span>
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default Home;
