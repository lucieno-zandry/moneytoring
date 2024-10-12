import { JsObject } from "../config/types/variables";

/**
 * Applique une vérification sur la valeur d'un `name` défini et retourne le message de validation qui correspond
 * @param type la valeur de l'attribut `name`
 * @param value la valeur du champ
 * @returns Le message d'erreur trouvé ou null s'il n'y en a pas
 */
const getValidationMessage = (
  type: string,
  value: string,
  data: JsObject = {}
): string | null => {
  let message = null;
  let regexPattern = null;

  switch (type) {
    case "account.name":
      regexPattern = /^[a-zéèâàäöïîôòìëêûüùç]{2,20}$/i;
      if (!value) {
        message = "The name field is required";
      } else if (value.length < 2) {
        message = "The name should contain at least 2 characters";
      } else if (!regexPattern.test(value)) {
        message = "The name should contain only alphabetic characters";
      }

      break;

    case "account.balance":
      const balance = parseFloat(value);

      if (isNaN(balance)) {
        message = "The balance should be Numeric only";
      }

      break;

    case "user.name":
      regexPattern = /^[a-zéèâàäöïîôòìëêûüùç]{2,20}$/i;
      if (!value) {
        message = "The name field is required";
      } else if (value.length < 2) {
        message = "The name should contain at least 2 characters";
      } else if (!regexPattern.test(value)) {
        message = "The name should contain only alphabetic characters";
      }

      break;

    case "user.firstname":
      regexPattern =
        /^[a-zéèâàäöïîôòìëêûüùç]{2,20}(\s[a-zéèâàäöïîôòìëêûüùç]{2,20}){0,2}$/i;
      if (!value) {
        message = "The firstname is required";
      } else if (value.length < 2) {
        message = "The firstname should contain at least 2 characters";
      } else if (!regexPattern.test(value)) {
        message = "The firstname should contain only alphabetic characters";
      }

      break;

    case "user.email":
      regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

      if (!value) {
        message = "The email adress is required";
      } else if (!regexPattern.test(value)) {
        message = "This email format is invalid";
      }
      break;

    case "user.password":
      if (!value) {
        message = "The password is required";
      } else if (value.length < 6) {
        message = "The password length should be at least 6 caracters";
      }
      break;

    case "user.password_confirmation":
      if (data["user.password"] !== value) {
        message = "The passwords don't match";
      }
      break;

    case "category.name":
      regexPattern = /^[a-zéèâàäöïîôòìëêûüùç]{2,20}$/i;
      if (!value) {
        message = "The name field is required";
      } else if (value.length < 2) {
        message = "The name should contain at least 2 characters";
      } else if (!regexPattern.test(value)) {
        message = "The name should contain only alphabetic characters";
      }

      break;

    case "category.budget":
      const budget = parseFloat(value);

      if (isNaN(budget)) {
        message = "The budget should be Numeric only";
      }

      break;

    case "transaction.amount":
      const amount = parseFloat(value);

      if (isNaN(amount)) {
        message = "The amount should be numeric only";
      } else if (amount <= 0) {
        message = "The amount must be greater than 0";
      }

      break;

    default:
      break;
  }

  return message;
};

export default getValidationMessage;
