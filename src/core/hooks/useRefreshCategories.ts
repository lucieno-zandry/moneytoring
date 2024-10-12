import { getCategories } from "../api/actions";
import { Category } from "../config/types/models";
import useCategories from "./useCategories";
import useAuth from "./useAuth";

export default function () {
  const { user } = useAuth();
  const { setCategories } = useCategories();

  return () => {
    if (!user) return;

    getCategories().then((response) => {
      const categories = response.data.categories as Category[];
      setCategories(categories);
    });
  };
}
