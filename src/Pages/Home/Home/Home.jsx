import React from 'react';
import Banner from '../Banner/Banner';
import FeatureSection from '../FeatureSection/FeatureSection';
import DonationRequestsPreview from '../DonationRequestsPreview/DonationRequestsPreview';
import ContactUs from '../ContactUs/ContactUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeatureSection></FeatureSection>
            <DonationRequestsPreview></DonationRequestsPreview>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;