import React from 'react';
 
import logo from '../assets/Rokto Sheba logo.png'
const RoktoShebaLogo = () => {
    return (
        <div className='flex justify-center items-center gap-2'>
            <img className='w-[50px] rounded-full' src={logo} alt="" />
            <h1 className='text-2xl font-bold'>RoktoSheba</h1>
        </div>
    );
};

export default RoktoShebaLogo;