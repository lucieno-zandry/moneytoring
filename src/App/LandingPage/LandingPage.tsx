import React from "react"
// import Section1 from "./Section1/Section1";
import Navbar from "./Navbar/Navbar";
import Header from "./Header/Header";
import Section2 from "./Section2/Section2";
import HowTo from "./HowTo/HowTo";
import Spacer from "../../partials/Spacer/Spacer";
import Footer from "./Footer/Footer";

export default React.memo(() => {
    return <div className="landing-page">
        <Navbar />
        <Header />
        <Section2 />
        <HowTo />
        {/* <Section1 /> */}
        <Spacer height={25} />
        <Footer />
    </div>
});