import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../../../partials/Section/Section";
import Button from "../../../partials/Button/Button";

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
                color: 'transparent',
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
        
        <div className="gradient-container">
            <Section className="lp-content activable py-5 px-3 d-flex flex-column align-items-center justify-content-center gap-4 text-align-center">
                <h2 className="display-2 text-primary">Take Control of <br /> Your Finances</h2>
                <p>
                    Welcome to MoneyToring, where managing your budget becomes effortless.<br />
                    Track your expenses, set goals, and achieve financial freedom with ease.
                </p>
                <Button variant="primary" className="col-6 col-sm-3">Get started</Button>
            </Section>
        </div>
    </>
})