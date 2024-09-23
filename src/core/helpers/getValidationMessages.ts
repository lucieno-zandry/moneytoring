import { JsObject } from "../config/types/variables";
import getValidationMessage from "./getValidationMessage"

/**
 * Applique une validation pour chaque entrée de l'objet
 * @param formData l'objet qui contient les données de formulaire
 * @returns l'objet qui contient les données de validation
 */
function getValidationMessages<T extends JsObject>(formData: T): T | null {
    let messages = {} as JsObject;
    
    for (let id in formData) {
        const message = getValidationMessage(id, formData[id]);
        if (message) {
            messages = { ...messages, [id]: message }
        }
    }

    return (Object.keys(messages).length) ? messages as T : null;
}

export default getValidationMessages;