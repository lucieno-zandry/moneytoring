import { JsObject } from "../config/types/variables";
import getFormData, { Attribute } from "./getFormData";
import getValidationMessages from "./getValidationMessages";
import unPrefixKeys from "./unPrefixKeys";

export default <T extends JsObject = JsObject>(e: React.FormEvent<HTMLFormElement>, attribute: Attribute = 'id') => {
  e.preventDefault();
  
  const formData = getFormData<T>(e, attribute);
  let validationMessages = getValidationMessages<T>(formData);

  return {
    validationMessages,
    formData: unPrefixKeys(formData),
  }
};