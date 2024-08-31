/**
 * Applique une vérification sur la valeur d'un `name` défini et retourne le message de validation qui correspond
 * @param type la valeur de l'attribut `name`
 * @param value la valeur du champ
 * @returns Le message d'erreur trouvé ou null s'il n'y en a pas
 */
const getValidationMessage = (type: string, value: string): string | null => {
    let message = null;
    let regexPattern = null;

    switch (type) {
        case "user.name":
            regexPattern = /^[a-zéèâàäöïîôòìëêûüùç]{2,20}$/i;
            if (!value) {
                message = "Le nom est requis.";
            } else if (value.length < 2) {
                message = "Le nom doit contenir au moins 2 (deux) caractères.";
            } else if (!regexPattern.test(value)) {
                message = "Le nom doit contenir uniquement des caractères alphabétiques.";
            }

            break;

        case "user.firstname":
            regexPattern = /^[a-zéèâàäöïîôòìëêûüùç]{2,20}(\s[a-zéèâàäöïîôòìëêûüùç]{2,20}){0,2}$/i;
            if (!value) {
                message = "Le prénom est requis.";
            } else if (value.length < 2) {
                message = "Le prénom doit contenir au moins 2 (deux) caractères.";
            } else if (!regexPattern.test(value)) {
                message = "Le prénom doit contenir uniquement des caractères alphabétiques.";
            }

            break;

        case "user.email":
            regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

            if (!value) {
                message = "L'adresse email est requise.";
            } else if (!regexPattern.test(value)) {
                message = "Le format de l'email n'est pas valide.";
            }
            break;

        case "user.password":
            if (!value) {
                message = "Le mot de passe est requis.";
            } else if (value.length < 6) {
                message = "Le mot de passe doit contenir au moins six caractères.";
            }
            break;

        case "user.current_password":
            if (!value) {
                message = "Le mot de passe est requis.";
            } else if (value.length < 6) {
                message = "Le mot de passe doit contenir au moins six caractères.";
            }
            break;

        case "password_confirmation":
            if (!value) {
                message = "The password is required";
            } else if (value.length < 6) {
                message = "The password length should be at least 6 caracters";
            }
            break;

        default:
            break;
    }

    return message;
}

export default getValidationMessage;