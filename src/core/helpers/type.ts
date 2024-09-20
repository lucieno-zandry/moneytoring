import { JsObject } from "../config/types/variables";

export default function (item: unknown): string {
  if (item && typeof item === "object") {
    if (!Array.isArray(item)) {
      const element: JsObject = item;
      if (element.balance) return "Account";
      if (element.budget) return "Category";
    }
  }
  return typeof item;
}