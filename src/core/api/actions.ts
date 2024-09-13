import { loginApi } from "../config/links/api";
import api from "./api";

export const login = (payload: { email: string; password: string }) => {
  return api.post(loginApi, payload);
};

export const signup = (payload: {
  email: string;
  password: string;
  password_confirmation: string;
  firstname: string;
  lastname: string;
}) => {
  return api.post(loginApi, payload);
};

export const allNotifications = () => {
  return api.get('/notification/all');
}

export const unreadNotifications = () => {
  return api.get('/notification/unread');
}

export const readNotification = (notification_id: string) => {
  return api.put(`/notification/read/${notification_id}`);
}

export const getWstoken = () => {
  return api.get('/wstoken/get');
}