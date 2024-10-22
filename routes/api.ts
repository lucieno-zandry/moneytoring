import { Router } from "express";
import auth from "./partials/auth";
import account from "./partials/account";
import setting from "./partials/setting";
import category from "./partials/category";
import transaction from "./partials/transaction";
import transactionHistory from "./partials/transactionHistory";

const route = Router();

route.use("/auth", auth);
route.use("/account", account);
route.use("/setting", setting);
route.use("/category", category);
route.use("/transaction", transaction);
route.use("/history", transactionHistory);

export default route;
