import { JsObject } from "../config/types/variables";
import getFormData, { Attribute } from "./getFormData";
import getValidationMessages from "./getValidationMessages";
import unPrefixKeys from "./unPrefixKeys";

export default (e: React.FormEvent<HTMLFormElement>, attribute: Attribute = 'id') => {
  e.preventDefault();
  
  const formData = getFormData(e, attribute);
  let validationMessages = getValidationMessages<JsObject>(formData);

  return {
    validationMessages: validationMessages ? unPrefixKeys(validationMessages) : null,
    formData: unPrefixKeys(formData),
  }
};