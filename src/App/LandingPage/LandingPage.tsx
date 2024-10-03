import React from "react"
import Section1 from "./Section1/Section1";
import Navbar from "./Navbar/Navbar";
import Header from "./Header/Header";
import Section2 from "./Section2/Section2";
import HowTo from "./HowTo/HowTo";
import Spacer from "../../partials/Spacer/Spacer";

export default React.memo(() => {
    return <div className="landing-page">
        <Navbar />
        <Header />
        <Section2 />
        {/* <div className="spacer"></div>
        <div className="spacer"></div> */}
        <HowTo />
        <Section1 />
        <Spacer height={100} />
    </div>
});