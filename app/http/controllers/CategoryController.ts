import { Request, Response } from "express";
import {
  CategoryCreateData,
  CategoryUpdateData,
  createCategories,
  deleteCategories,
  findCategoriesByUser,
  updateCategory,
} from "../../models/Category";
import auth from "../../helpers/auth";

export default {
  all: async (request: Request, response: Response) => {
    const categories = await findCategoriesByUser(auth(response).id);
    response.json({ categories });
  },
  create: async (request: Request, response: Response) => {
    const categories: CategoryCreateData[] = request.body;
    const createdCategories = await createCategories(categories);
    response.status(201).json({ categories: createdCategories });
  },
  update: async (request: Request, response: Response) => {
    const category: CategoryUpdateData = request.body;
    const updated = await updateCategory(category);
    response.json({ category: updated });
  },
  delete: async (request: Request, response: Response) => {
    const categories: number[] = request.body;
    const deleted = await deleteCategories(categories);
    response.json({ deleted });
  },
};
