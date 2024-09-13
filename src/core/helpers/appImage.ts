import { API_BASE_URL } from "../config/constants/constants";

const APP_STORAGE_PATH = `${API_BASE_URL}/storage/`;

/**
 * Obtiens le chemin complet de l'image à afficher
 * @param image une chaine de caractère qui représente le chemin de l'image
 * @returns le chemin complet et approprié de l'image
 */
const appImage = (image: string | null): string | undefined => {
    if (image) {
        return APP_STORAGE_PATH + image;
    }

    return undefined;
}

export default appImage;