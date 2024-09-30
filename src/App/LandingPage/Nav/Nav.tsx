import React from "react";

export default React.memo(() => {
    return <nav className="lp-nav">
        <div className="left-side">
            <a href="#" className="lp-nav-link">services</a>
            <a href="#" className="lp-nav-link">about</a>
        </div>
        <div className="right-side">
            <a href="#" className="lp-nav-link">log in</a>
            <a href="#" className="lp-nav-link">register</a>
        </div>
    </nav>
})