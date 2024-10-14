import { Setting } from "@prisma/client";
import prisma from "../../prisma/prisma";

export type CreateSettingData = Pick<Setting, "language" | "currency" | "user_id">;

const Setting = prisma.setting;

export const getSetting = (user_id: number) => {
  return Setting.findFirst({ where: { user_id } });
};

export const createSetting = (data: CreateSettingData) => {
  return Setting.create({ data });
};

export const updateSetting = async (settingData: CreateSettingData) => {
  const { user_id, ...data } = settingData;

  return Setting.update({
    data,
    where: {
      user_id,
    },
  });
};

export default Setting;
