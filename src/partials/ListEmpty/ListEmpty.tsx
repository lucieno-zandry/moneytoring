import React from "react";
import image from "./ListEmpty.png";

const ListEmpty = React.memo(() => {
    return <div className="list-empty d-flex flex-column gap-2 align-items-center ">
        <img src={image} className="img-responsive col-8 col-sm-3"/>
        <h3 className="display-6">There is nothing in here!</h3>
    </div>
});

export default ListEmpty;