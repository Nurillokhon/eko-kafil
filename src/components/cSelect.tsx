/** @format */

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTranslation } from "react-i18next";

const CountrySelect = () => {
  const { i18n } = useTranslation();
  const changeLang = (value: string) => {
    i18n.changeLanguage(value);
    window.location.reload();
  };

  return (
    <Select value={i18n.language} onValueChange={changeLang}>
      <SelectTrigger
        className="
          w-[90px] text-main 
          border-main 
          focus:border-main 
          focus:ring-main 
          focus:ring-2 
          focus:ring-offset-0 
          hover:border-main
        "
      >
        <SelectValue placeholder="" />
      </SelectTrigger>

      <SelectContent
        className="
          border border-main 
          focus:border-main 
          focus:ring-main 
          w-[90px]
        "
      >
        <SelectItem
          value="uz"
          className="hover:bg-main/20 focus:bg-main/30 text-main"
        >
          Uzb
        </SelectItem>

        <SelectItem
          value="ru"
          className="hover:bg-main/20 focus:bg-main/30 text-main"
        >
          Rus
        </SelectItem>

        <SelectItem
          value="en"
          className="hover:bg-main/20 focus:bg-main/30 text-main"
        >
          Eng
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CountrySelect;
