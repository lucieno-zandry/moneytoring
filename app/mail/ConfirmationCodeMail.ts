import Mail from "../../config/mailer";
import ConfirmationCodeHtml from "../../resources/views/email/ConfirmationCode.html";

class ConfirmationCodeMail extends Mail {
  constructor() {
    super();
    this.subject("Account confirmation.");
  }
  
  code(confirmation_code: number) {
    this.html(ConfirmationCodeHtml(confirmation_code));
    return this;
  }
}

export default ConfirmationCodeMail;
