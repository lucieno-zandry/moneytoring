import { Category } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import validate from "../../helpers/validate";
import auth from "../../helpers/auth";
import { CategoryCreateData, CategoryUpdateData } from "../../models/Category";

export type CategoryRequestData = Pick<Category, "icon" | "name" | "budget">;

const categoryDataPlaceholder: CategoryRequestData = {
  icon: "",
  name: "",
  budget: 0,
};

const validateCategory = (
  categoryRequestData: CategoryRequestData,
  response: Response
) => {
  const data: CategoryRequestData = {
    ...categoryDataPlaceholder,
    ...categoryRequestData,
  };
  const validated = validate(data, response, "Category");
  return validated;
};

export const CategoryCreateRequest = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const categories = request.body as CategoryRequestData[];
  if (!Array.isArray(categories) || categories.length === 0) {
    response.sendStatus(403);
    return;
  }

  const validateds: CategoryCreateData[] = [];
  const user_id = auth(response).id;

  for (let category of categories) {
    const {validated, isValid} = validateCategory(category, response);
    if (!isValid || !validated) return;
    validateds.push({ ...validated, user_id });
  }

  request.body = validateds;
  next();
};

export const CategoryUpdateRequest = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const category: CategoryUpdateData = request.body;
  if (!category.id) {
    response.sendStatus(403);
    return;
  }

  const {isValid, validated} = validateCategory(category, response);

  if (!isValid || !validated) return;
  request.body = { ...validated, id: category.id };
  next();
};

export const CategoryDeleteRequest = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const categories: number[] = request.body;

  if (!Array.isArray(categories) || categories.length === 0) {
    response.sendStatus(403);
    return;
  }

  next();
};
