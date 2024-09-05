import { JsObject } from "../config/types/variables";
import getFormData, { Attribute } from "./getFormData";
import getValidationMessages from "./getValidationMessages";
import toFormatedObject from "./toFormatedObject";

export default (e: React.FormEvent<HTMLFormElement>, attribute: Attribute = 'id') => {
  e.preventDefault();
  
  const formData = getFormData(e, attribute);
  let validationMessages = getValidationMessages<JsObject>(formData);

  return {
    validationMessages: validationMessages ? toFormatedObject(validationMessages) : null,
    formData: toFormatedObject(formData),
  }
};