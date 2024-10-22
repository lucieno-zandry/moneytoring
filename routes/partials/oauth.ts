import { Router } from "express";
import OAuthController from "../../app/http/controllers/OAuthController";

const oauth = Router();

oauth.post("/google", OAuthController.google);

export default oauth;