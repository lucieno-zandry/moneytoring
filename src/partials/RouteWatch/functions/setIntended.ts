import { PATHNAME_INTENDED } from "../config/constants";

const setIntended = (condition: boolean, pathname?: string) => {
    sessionStorage.setItem(
        PATHNAME_INTENDED,
        JSON.stringify({ condition, pathname })
    );
};

export default setIntended;