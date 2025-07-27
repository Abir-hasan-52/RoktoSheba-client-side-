import React from 'react';
import { FaHandHoldingMedical } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-red-800 animate-fade-in">
      <div className="text-center px-4">
        <FaHandHoldingMedical className="text-6xl text-red-600 mb-4 animate-pulse" />
        <h1 className="text-4xl font-bold mb-2">Access Denied</h1>
        <p className="text-lg mb-6 max-w-md mx-auto">
          You don’t have permission to view this page on <span className="font-semibold text-red-600">RoktoSheba</span>. 
          Please login with an authorized account.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition duration-300 shadow-md"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Forbidden;
