import { User } from "@prisma/client";
import Notification from "../../config/notification";
import { createNotification } from "../models/Notification";

export default function <T extends Notification>(user: User, notification: T) {
  const user_id = user.id;

  notification.via().forEach(async (via) => {
    switch (via) {
      case "database":
        if (!notification.toJson) return;
        await createNotification({ user_id, data: notification.toJson(user) });
        break;

      case "mail":
        if (!notification.toMail) return;
        await notification.toMail(user).send();
        break;

      default:
        break;
    }
  });
}
