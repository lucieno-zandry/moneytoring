import React from "react"
import Section1 from "./Section1/Section1";
import Nav from "./Nav/Nav";
import Header from "./Header/Header";
// import Video1 from './video1.webp';

export default React.memo(() => {
    return <div className="landing-page">
        <Nav />
        <Header />
        <Section1 />
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
    </div>
})