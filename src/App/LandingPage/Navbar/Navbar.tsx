import React from "react";
import { Link } from "react-router-dom";
import { about, loginPage, signupPage } from "../../../core/config/links/pages";

export default React.memo(() => {
    return <nav className="lp-nav">
        <div className="left-side">
            <a href="#" className="lp-nav-link">services</a>
            <Link to={about} className="lp-nav-link">about</Link>
        </div>
        <div className="right-side">
            <Link to={loginPage} className="lp-nav-link">log in</Link>
            <Link to={signupPage} className="lp-nav-link">register</Link>
        </div>
    </nav>
})