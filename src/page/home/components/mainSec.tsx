/** @format */

import UzbekistanMap from "../../../components/UzbekistanMap";
import Weather from "../../../components/weather";

const MainSec = () => {
  return (
    <div className="myContainer flex flex-col lg:flex-row justify-center items-start gap-6 p-4">
      <div className="w-full  lg:w-[70%] ">
        <UzbekistanMap />
      </div>
      <div className="w-full lg:w-[30%]">
        <Weather />
      </div>
    </div>
  );
};

export default MainSec;
