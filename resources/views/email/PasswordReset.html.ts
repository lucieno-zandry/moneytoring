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
        <title>Password Reset Request</title>
        <style>
            ${emailStyleCss}
        </style>
    </head>
    <body>
        <h1>Password Reset Request</h1>

        <p>You recently requested to reset your password for ${process.env.APP_NAME}.</p>

        <p>To reset your password, please click the button below or copy and paste the link into your browser:</p>

        <div>
            <a href="${process.env.FRONTEND_EMAIL_PASSWORD_RESET_URL}/${token}" class="btn btn-primary">Reset Password</a>
        </div>

        <p>If you didn't request this email, please ignore it.</p>
    </body>
    </html>`;
}
