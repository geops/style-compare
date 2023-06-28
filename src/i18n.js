import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "./translations/de.json";
import en from "./translations/en.json";

const resources = {
  de,
  en,
};

i18n.use(initReactI18next).init({
  resources,
  lng: "de",
  keySeperator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
