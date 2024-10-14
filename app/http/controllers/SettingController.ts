import { Request, Response } from "express";
import auth from "../../helpers/auth";
import { createSetting, CreateSettingData, getSetting, updateSetting } from "../../models/Setting";

export default {
     get: async (request: Request, response: Response) => {
      const userId = auth(response).id;
      const setting = await getSetting(userId);
      response.json({ setting });
     },
     set: async (request: Request, response: Response) => {
      const data: CreateSettingData = request.body;
      const userId = auth(response).id;
      let setting = await getSetting(userId);
  
      if (setting) {
        updateSetting(data);
        setting = { ...setting, ...data };
      } else {
        setting = await createSetting(data);
      }
  
      response.status(201).json({ setting });
    }
  }
  