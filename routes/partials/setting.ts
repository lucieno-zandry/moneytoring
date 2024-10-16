import { Router } from "express";
import SettingController from "../../app/http/controllers/SettingController";
import AuthMiddleware from "../../app/http/middlewares/AuthMiddleware";
import SettingRequest from "../../app/http/requests/SettingRequest";

const setting = Router();
setting.use(AuthMiddleware);

setting.get("/get", SettingController.get);

setting.post(
  "/create",
  SettingRequest,
  SettingController.set
);

setting.put(
  "/update",
  SettingRequest,
  SettingController.set
);

export default setting;