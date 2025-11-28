/** @format */

import { FaLeaf } from "react-icons/fa";
import CountrySelect from "./cSelect";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div
        className="
          myContainer 
          flex items-center justify-between 
          py-3 
        "
      >
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="transition-transform duration-300 group-hover:scale-110">
            <FaLeaf size={32} color="#832124" />
          </div>

          <h1 className="text-[24px] font-bold text-main tracking-wide">
            ECO-KAFIL
          </h1>
        </div>

        <div className="flex items-center">
          <CountrySelect />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
