import React from 'react';
import Banner from '../Banner/Banner';
import FeatureSection from '../FeatureSection/FeatureSection';
import DonationRequestsPreview from '../DonationRequestsPreview/DonationRequestsPreview';
import ContactUs from '../ContactUs/ContactUs';
import StatsSection from '../StatsSection/StatsSection';
import TopDonors from './TopDonors/TopDonors';
import Testimonials from './Testimonials/Testimonials';
import BloodCompatibilityTable from '../BloodCompatibilityTable/BloodCompatibilityTable';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeatureSection></FeatureSection>
            <StatsSection></StatsSection>
             
            <DonationRequestsPreview></DonationRequestsPreview>
            <TopDonors></TopDonors>
            <BloodCompatibilityTable/>
            <Testimonials></Testimonials>
            <ContactUs></ContactUs>

        </div>
    );
};

export default Home;