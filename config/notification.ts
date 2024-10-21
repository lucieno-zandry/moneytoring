import { InputJsonValue } from "@prisma/client/runtime/library";
import Mail from "./mailer";
import { User } from "@prisma/client";

interface Notification {
  via: () => string[];
  toJson?: (user: User) => {
    title: string;
    icon: string;
    line: string;
    action: string;
  };
  toMail?: (user: User) => Mail;
}

// type Notification = {
//   via: () => string[];
//   toJson?: (user: User) => {
//     title: string;
//     icon: string;
//     line: string;
//     action: string;
//   };
//   toEmail?: (user: User) => Mail;
// };

export default Notification;
