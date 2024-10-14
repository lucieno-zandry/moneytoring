import { KeyValueObject } from "../../config/types";
import { CODE_MAX, CODE_MIN } from "../models/ConfirmationCode";

/**
 * Applique une vérification sur la valeur d'un `name` défini et retourne le message de validation qui correspond
 * @param type la valeur de l'attribut `name`
 * @param value la valeur du champ
 * @returns Le message d'erreur trouvé ou null s'il n'y en a pas
 */
const getValidationMessage = (
  key: string,
  value: unknown,
  data: KeyValueObject = {}
): string | null => {
  let message = "";

  switch (key) {
    case "Account.name":
      if (!isString(value)) {
        message = "The name field is required";
      } else if (value.length < 2) {
        message = "The name should contain at least 2 characters";
      } else if (!isName(value)) {
        message = "The name should contain only alphabetic characters";
      }

      break;

    case "Account.balance":
      if (!isNumber(value)) {
        message = "The balance should be Numeric only";
      }

      break;

    case "Account.icon":
      if (!isString(value)) {
        message = "The icon should be a string";
      }
      break;

    case "User.name":
      if (!isString(value)) {
        message = "The name field is required";
      } else if (value.length < 2) {
        message = "The name should contain at least 2 characters";
      } else if (!isName(value)) {
        message = "The name should contain only alphabetic characters";
      }

      break;

    case "User.firstname":
      if (!value || !isString(value)) {
        message = "The firstname is required";
      } else if (value.length < 2) {
        message = "The firstname should contain at least 2 characters";
      } else if (!isLongName(value)) {
        message = "The firstname should contain only alphabetic characters";
      }

      break;

    case "User.email":
      if (!isString(value)) {
        message = "The email adress is required";
      } else if (!isEmail(value)) {
        message = "This email format is invalid";
      }
      break;

    case "User.password":
      if (!isString(value)) {
        message = "The password is required";
      } else if (value.length < 6) {
        message = "The password length should be at least 6 caracters";
      }
      break;

    case "User.password_confirmation":
      if (data["password"] !== value) {
        message = "The password don't match";
      }
      break;

    case "ConfirmationCode.code":
      if (!isNumber(value)) {
        message = "The code should be a number";
      } else if (value < CODE_MIN || value > CODE_MAX) {
        message = "The code format is not valid";
      }
      break;

    case "Setting.language":
      if (!data["LANGUAGES"] || !Array.isArray(data["LANGUAGES"])) return null;

      if (!data["LANGUAGES"].includes(value)) {
        message = "This language is not available.";
      }
 
      break;

    case "Setting.currency":
      if (!data["CURRENCIES"] || !Array.isArray(data["CURRENCIES"]))
        return null;

      if (!data["CURRENCIES"].includes(value)) {
        message = "This currency is not available.";
      }

      break;

    case "Category.name":
      if (!isString(value)) {
        message = "The category name should be a string";
      } else if (!isLongName(value)) {
        message =
          "The category should containe only 2 alphabetic characters or more.";
      }
      break;

    case "Category.icon":
      if (!isString(value)) {
        message = "The icon should be a string";
      }
      break;

    case "Category.budget":
      if (!isNumber(value) || value < 0) {
        message = "The category should be a positive number.";
      }
      break;

    default:
      return null;
  }

  return message;
};

export default getValidationMessage;

function isString(value: unknown) {
  return typeof value === "string";
}

function isNumber(value: unknown) {
  return typeof value === "number";
}

function isName(value: string) {
  const regexPattern = /^[a-zéèâàäöïîôòìëêûüùç]{2,20}$/i;
  return regexPattern.test(value);
}

function isLongName(value: string) {
  const regexPattern =
    /^[a-zéèâàäöïîôòìëêûüùç]{2,20}(\s[a-zéèâàäöïîôòìëêûüùç]{2,20}){0,2}$/i;
  return regexPattern.test(value);
}

function isEmail(value: string) {
  const regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  return regexPattern.test(value);
}
