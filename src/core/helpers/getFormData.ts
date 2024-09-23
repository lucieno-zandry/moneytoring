import { JsObject } from "../config/types/variables";

export type Attribute = 'id' | 'name';

/**
 * Permet de convertir le contenu d'un formulaire en JS Object à partir de son attribut `name`
 * @param {*} event l'évenement qui résulte de la submission du formulaire
 * @returns {Object} les données du formulaire formatées en {[key]: value}
 */
const getFormData = <T = JsObject>(event: any, attribute: Attribute = 'id') => {
    let formData: JsObject = {};

    const inputsCount = event.target?.length;

    if (inputsCount > 0) {
        for (let i = 0; i < inputsCount; i++) {
            const { value } = event.target[i];
            const key = event.target[i][attribute];
            
            if (key && value !== undefined) {
                formData = { ...formData, [key]: value }
            }
        }
    }

    return formData as T;
}

export default getFormData;