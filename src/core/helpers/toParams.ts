import { FilterData } from "../../partials/Filter/Filter";

export default (filter?: FilterData) => {
  if (!filter) return undefined;

  const categories = filter.categories;
  const categoriesId = categories?.map((category) => category.id);

  const accounts = filter.accounts;
  const accountsId = accounts?.map((category) => category.id);

  const params = { ...filter, accounts: accountsId, categories: categoriesId };
  return params;
};
