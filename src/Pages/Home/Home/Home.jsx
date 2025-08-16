import React from "react";
import Banner from "../Banner/Banner";
import FeatureSection from "../FeatureSection/FeatureSection";
import DonationRequestsPreview from "../DonationRequestsPreview/DonationRequestsPreview";
import ContactUs from "../ContactUs/ContactUs";
import StatsSection from "../StatsSection/StatsSection";
import TopDonors from "./TopDonors/TopDonors";
import Testimonials from "./Testimonials/Testimonials";
import BloodCompatibilityTable from "../BloodCompatibilityTable/BloodCompatibilityTable";
import FAQsSection from "../FAQsSection/FAQsSection";
import About from "../../About/About";
import DonationProcess from "../DonationProcess/DonationProcess";
import SearchPage from "../../SearchPage/SearchPage";

const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <FeatureSection></FeatureSection>
      <StatsSection></StatsSection>
      <DonationProcess />
      <DonationRequestsPreview></DonationRequestsPreview>
      <TopDonors></TopDonors>
      <BloodCompatibilityTable />
      <Testimonials></Testimonials>
      <FAQsSection />
      <About />
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
