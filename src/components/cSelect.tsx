/** @format */

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const CountrySelect = () => {
  const [value, setValue] = React.useState<string>("uz");

  return (
    <Select value={value} onValueChange={(val: string) => setValue(val)}>
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
          value="us"
          className="hover:bg-main/20 focus:bg-main/30 text-main"
        >
          Eng
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CountrySelect;
