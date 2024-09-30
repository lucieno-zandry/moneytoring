import React from "react";
import Hero from './Hero.jpg';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default React.memo(() => {
    const logoRef = React.createRef<HTMLHeadingElement>();

    React.useEffect(() => {
        if (!logoRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            animation: gsap.from(".lp-logo", {
                y: "50vh",
                fontSize: "14vw",
                yPercent: -50,
            }),
            scrub: true,
            trigger: ".lp-content",
            start: "top bottom",
            endTrigger: ".lp-content",
            end: "top center",
        });

    }, [logoRef]);

    return <>
        <div className="lp-logo-container">
            <h1 className="lp-logo" ref={logoRef}>MoneyToring</h1>
        </div>
        <div className="lp-container"></div>
        <div className="lp-content">
            <img className="lp-hero" src={Hero} />
        </div>
    </>
})