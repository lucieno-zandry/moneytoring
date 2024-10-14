import { config } from "dotenv";
import nodemailer from "nodemailer";
import SMTPPool from "nodemailer/lib/smtp-pool";

config();

const transportOptions: Omit<SMTPPool.Options, "pool"> = {
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT!),
  secure: Boolean(process.env.MAIL_ENCRYPTION === "ssl"),
  auth: {
    user: process.env.MAIL_FROM_ADDRESS,
    pass: process.env.MAIL_PASSWORD!,
  },
  name: process.env.MAIL_FROM_NAME!,
  encoding: process.env.MAIL_ENCRYPTION,
};

const mailer = nodemailer.createTransport(transportOptions);

class Mail {
  private mail_from: string = process.env.MAIL_FROM_ADDRESS!;
  private mail_to: string = "";
  private mail_subject: string = "";
  private mail_text: string = "";
  private mail_html: string = "";
  
  from(from: string) {
    this.mail_from = from;
    return this;
  }

  to(to: string) {
    this.mail_to = to;
    return this;
  }

  subject(subject: string) {
    this.mail_subject = subject;
    return this;
  }

  text(text: string) {
    this.mail_text = text;
    return this;
  }

  html(html: string) {
    this.mail_html = html;
    return this;
  }

  async send() {
    const mailOptions = {
      from: this.mail_from,
      to: this.mail_to,
      subject: this.mail_subject,
      text: this.mail_text,
      html: this.mail_html,
    };

    try {
      await mailer.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default Mail;
