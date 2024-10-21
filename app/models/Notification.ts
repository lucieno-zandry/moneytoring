import { Notification } from "@prisma/client";
import prisma from "../../prisma/prisma";
import { InputJsonValue } from "@prisma/client/runtime/library";

const Notification = prisma.notification;

export const createNotification = (notification: {
  user_id: number;
  data: InputJsonValue;
}) => {
  return Notification.create({ data: notification });
};

export const markNotificationAsRead = (id: number) => {
  return Notification.update({ data: { read_at: new Date() }, where: { id } });
};

export const deleteNotifications = (ids: number[]) => {
  return Notification.deleteMany({ where: { id: { in: ids } } });
};

export default Notification;