import { config } from "dotenv";
import emailStyleCss from "../../css/email.style.css";

config();

export default function (code: number) {
  const codeString = code.toString().split("").join(" ");
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email confirmation</title>
    <style>
    ${emailStyleCss}
    </style>
</head>

<body>
    <div class="container bg-dark rounded">
        <header class="mb-4">
            <h1 class="display-2">Email confirmation</h1>
        </header>
        <main class="mb-4">
            <p class="mb-2">Hello, <strong>John</strong>!</p>
            <p>Thank you for using Moneytoring, use the code below to confirm you email.</p>
            <div class="tac mt-4 mb-4">
                <div class="display-1 my-2">${codeString}</div>
                <button class="btn btn-primary mb-2">Open app</button>
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
