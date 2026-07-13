import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import SearchAppointment from "./sections/SearchAppointment";
import Statistics from "./sections/Statistics";
import Services from "./sections/Services";
import AboutUs from "./sections/AboutUs";
import Departments from "./sections/Departments";
import Doctors from "./sections/Doctors";
import WhyChooseUs from "./sections/WhyChooseUs";
import HowItWorks from "./sections/HowItWorks";
import Testimonials from "./sections/Testimonials";
import FAQ from "./sections/FAQ";
import Newsletter from "./sections/Newsletter";
import Footer from "./sections/Footer";

const LandingPage = () => {
  return (
    <>s
      <Navbar />
      <Hero />
      <SearchAppointment />
      <Statistics />
      <Services />
      <AboutUs />
      <Departments />
      <Doctors />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
    </>
  );
};

export default LandingPage;