import { Category } from "@prisma/client";
import prisma from "../../prisma/prisma";
import { CategoryRequestData } from "../http/requests/CategoryRequest";

export type CategoryCreateData = Pick<
  Category,
  "icon" | "name" | "budget" | "user_id"
>;

export type CategoryUpdateData = Pick<
  Category,
  "icon" | "name" | "budget" | "id"
>;

const Category = prisma.category;

export const createCategories = async (categories: CategoryCreateData[]) => {
  const created: Category[] = [];

  for (let data of categories) {
    const category = await Category.create({ data });
    created.push(category);
  }
  
  return created;
};

export const updateCategory = ({ id, ...data }: CategoryUpdateData) => {
  return Category.update({ data, where: { id } });
};

export const deleteCategories = (ids: number[]) => {
  return Category.deleteMany({ where: { id: { in: ids } } });
};

export const findCategoriesByUser = (user_id: number) => {
  return Category.findMany({ where: { user_id } });
};

export default Category;
