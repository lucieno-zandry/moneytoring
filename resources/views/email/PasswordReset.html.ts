import { config } from "dotenv";
import emailStyleCss from "../../css/email.style.css";

config();

export default function (token: string) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
    ${emailStyleCss}
    </style>
</head>

<body>
    <div class="container bg-dark rounded">
        <header class="mb-4">
            <h1 class="display-2">Password Reset</h1>
        </header>
        <main class="mb-4">
            <p class="mb-2">Hello, <strong>John</strong>!</p>
            <p>Click on the link below to reset your password.</p>
            <div class="tac mt-4 mb-4">
                <a href="${process.env.FRONTEND_EMAIL_PASSWORD_RESET_URL}/${token}" class="btn btn-primary">Reset Password</a>
            </div>
            <p class="text-muted">If you are not the author of this action, just ignore this email.</p>
        </main>
        <footer>
            <p class="mb-1 text-muted">Best regards!</p>
            <h3 class="display-3">The Moneytoring Team.</h3>
        </footer>
    </div>
</body>

</html>
`;
}