import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import GiveFundingForm from './GiveFundingForm';
 

const stripePromise = loadStripe(import.meta.env.VITE_payment_key)

const MainFunding = () => {
    return (
         <Elements stripe={stripePromise}>
           <GiveFundingForm/> 
           
         </Elements>
        
    );
};

export default MainFunding;