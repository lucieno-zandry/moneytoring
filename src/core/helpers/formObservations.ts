import { JsObject } from "../config/types/variables";
import getFormData from "./getFormData";
import getValidationMessages from "./getValidationMessages";
import toFormatedObject from "./toFormatedObject";

export default (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  const formData = getFormData(e);
  let validationMessages = getValidationMessages<JsObject>(formData);

  return {
    validationMessages: validationMessages ? toFormatedObject(validationMessages) : null,
    formData: toFormatedObject(formData),
  }
};