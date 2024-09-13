import React from "react";
import generateArray from "../../core/helpers/generateArray";
import Motion from "../Motion/Motion";

const TablePlaceholder = React.memo(() => {
    return <Motion.Div className="table-placeholder">
        {generateArray(4).map((value, key) => {
            value;
            return <div className="table-placeholder-item placeholder-glow gap-3 d-flex mb-4" key={key}>
                <div className="placeholder" style={{ animationDelay: `${key * .5}s` }}></div>
                <div className="placeholder col" style={{ animationDelay: `${(key + 1) * .5}s` }}></div>
                <div className="placeholder col-2" style={{ animationDelay: `${(key + 2) * .5}s` }}></div>
            </div>
        })}
    </Motion.Div>
})

export default TablePlaceholder;