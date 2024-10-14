import Mail from "../../config/mailer";
import PasswordResetHtml from "../../resources/views/email/PasswordReset.html";

class PasswordResetMail extends Mail {
  token(passwordResetToken: string) {
    this.html(PasswordResetHtml(passwordResetToken));
    return this;
  }
}

export default new PasswordResetMail().subject("Password reset Request");
