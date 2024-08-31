import { Outlet } from "react-router-dom";

const Setup = () => {
    return <div className="setup px-5 d-flex flex-column justify-content-center">
        <Outlet />
    </div>
}

export default Setup;