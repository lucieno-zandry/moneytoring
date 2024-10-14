import { Router } from "express";
import auth from "./partials/auth";
import account from "./partials/account";
import setting from "./partials/setting";
import category from "./partials/category";

const route = Router();

route.use(auth);
route.use(account);
route.use(setting);
route.use(category);

export default route;
