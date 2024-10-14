import { config } from "dotenv";
import emailStyleCss from "../../css/email.style.css";

config();

export default function (code: number) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation Email</title>
  <style>
  ${emailStyleCss}
  </style>
</head>
<body>
  <h1>Account Confirmation.</h1>

  <p>Thank you for registering. To confirm your account, please click the button below or copy and paste the link into your browser:</p>

  <div>
    <a href="${
      process.env.FRONTEND_EMAIL_CONFIRMATION_URL
    }" class="btn btn-primary">Confirm Account</a>
  </div>

  <p>Your confirmation code is: ${code.toLocaleString()}</p>

  <p>If you didn't request this email, please ignore it.</p>
</body>
</html>`;
}
