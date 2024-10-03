import { setTranslations } from "react-i18nify";
import english from "./languages/english";
import french from "./languages/french";

setTranslations({
  ...english,
  ...french,
});
