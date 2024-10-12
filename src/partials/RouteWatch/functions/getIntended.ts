import { PATHNAME_INTENDED } from "../config/constants";
import { Intended } from "../config/types";

const getIntended = (): Intended | null => {
    const intended = sessionStorage.getItem(PATHNAME_INTENDED);
    if (!intended) return null;
    return JSON.parse(intended);
};

export default getIntended;