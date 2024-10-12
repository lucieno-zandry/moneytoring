import { JsObject } from "../config/types/variables";
import unPrefix from "./unPrefix";
import getValidationMessage from "./getValidationMessage";

/**
 * Applique une validation pour chaque entrée de l'objet
 * @param formData l'objet qui contient les données de formulaire
 * @returns l'objet qui contient les données de validation
 */
function getValidationMessages<T extends JsObject>(formData: T): T | null {
  let messages = {} as JsObject;

  for (let id in formData) {
    const message = getValidationMessage(id, formData[id], formData);
    if (message) {
      const key = unPrefix(id);
      messages = { ...messages, [key]: message };
    }
  }

  return Object.keys(messages).length ? (messages as T) : null;
}

export default getValidationMessages;
