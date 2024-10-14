import unPrefix from "./unPrefix";
import getValidationMessage from "./getValidationMessage";
import { KeyValueObject } from "../../config/types";
import prefixString from "./prefixString";

/**
 * Applique une validation pour chaque entrée de l'objet
 * @param formData l'objet qui contient les données de formulaire
 * @returns l'objet qui contient les données de validation
 */
function getValidationMessages<T extends KeyValueObject>(
  formData: T,
  validated: T,
  model?: string
): T | null {
  let messages = {} as KeyValueObject;

  for (let name in formData) {
    const key = model ? prefixString(model, name) : name;
    const value = formData[name];
    const message = getValidationMessage(key, value, formData);
    
    if (message) {
      messages = { ...messages, [name]: message };
    } else if (message === "") {
      validated[name] = value;
    }
  }

  return Object.keys(messages).length ? (messages as T) : null;
}

export default getValidationMessages;
