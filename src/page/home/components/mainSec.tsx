/** @format */

import { lazy, Suspense } from "react";

const UzbekistanMap = lazy(() => import("../../../components/UzbekistanMap"));
const Weather = lazy(() => import("../../../components/weather"));

const MainSec = () => {
  return (
    <div className="myContainer flex flex-col lg:flex-row justify-center items-start gap-6 p-4">
      <div className="w-full  lg:w-[70%] ">
        <h1 className="text-3xl font-bold">Uzbekistan Air Quality Map</h1>

        <Suspense
          fallback={
            <div className="h-[450px] bg-gray-200 animate-pulse rounded-3xl"></div>
          }
        >
          <UzbekistanMap />
        </Suspense>
      </div>
      <div className="w-full lg:w-[30%]">
        <h1 className="text-3xl font-bold mb-4">Today's Weather</h1>

        <Suspense
          fallback={
            <div className="h-[300px] bg-gray-200 animate-pulse rounded-3xl"></div>
          }
        >
          <Weather />
        </Suspense>
      </div>
    </div>
  );
};

export default MainSec;
