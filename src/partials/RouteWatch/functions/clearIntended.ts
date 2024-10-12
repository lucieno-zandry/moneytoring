import { PATHNAME_INTENDED } from "../config/constants";

export default () => {
    sessionStorage.removeItem(PATHNAME_INTENDED);
};