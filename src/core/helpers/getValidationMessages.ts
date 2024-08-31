import { JsObject } from "../config/types/variables";
import getValidationMessage from "./getValidationMessage"

/**
 * Applique une validation pour chaque entrée de l'objet
 * @param formData l'objet qui contient les données de formulaire
 * @returns l'objet qui contient les données de validation
 */
function getValidationMessages<Obj>(formData: JsObject): Obj | null {
    let messages = {} as JsObject;
    
    for (let id in formData) {
        const message = getValidationMessage(id, formData[id]);
        if (message) {
            messages = { ...messages, [id]: message }
        }
    }

    return (Object.keys(messages).length) ? messages as Obj : null;
}

export default getValidationMessages;