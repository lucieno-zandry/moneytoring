import { Router } from "express";
import AuthMiddleware from "../../app/http/middlewares/AuthMiddleware";
import CategoryController from "../../app/http/controllers/CategoryController";
import {
  CategoryCreateRequest,
  CategoryDeleteRequest,
  CategoryUpdateRequest,
} from "../../app/http/requests/CategoryRequest";

const category = Router();

category.use(AuthMiddleware);

category.get("/category/all", CategoryController.all);

category.post(
  "/category/create",
  CategoryCreateRequest,
  CategoryController.create
);
category.put(
  "/category/update",
  CategoryUpdateRequest,
  CategoryController.update
);

category.post(
  "/category/delete",
  CategoryDeleteRequest,
  CategoryController.delete
);

export default category;
