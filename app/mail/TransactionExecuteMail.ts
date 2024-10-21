import { Transaction } from "@prisma/client";
import Mail from "../../config/mailer";
import MailMessageHtml, {
  MailMessageData,
} from "../../resources/views/email/MailMessage.html";

class TransactionExecuteMail extends Mail {
  data(data: MailMessageData) {
    this.html(MailMessageHtml(data));
    return this;
  }
}

export default new TransactionExecuteMail().subject("Transaction Executed");
