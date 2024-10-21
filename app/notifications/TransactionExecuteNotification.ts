import { Account, Transaction, User } from "@prisma/client";
import Notification from "../../config/notification";
import TransactionExecuteMail from "../mail/TransactionExecuteMail";

class TransactionExecuteNotification implements Notification {
  via() {
    return ["database", "mail"];
  }

  toMail(user: User) {
    return TransactionExecuteMail.to(user.email).data({
      action: "View history",
      line: "A new transaction occured, your account balance has been updated.",
      link: "/transaction-history",
      title: "Account balance updated!",
      username: user.name,
    });
  }

  toJson() {
    return {
      title: "Account balance updated!",
      icon: "",
      action: "/transaction-history",
      line: "A new transaction occured, your account balance has been updated.",
    };
  }
}

export default TransactionExecuteNotification;
