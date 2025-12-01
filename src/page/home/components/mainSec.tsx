/** @format */

import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const UzbekistanMap = lazy(() => import("../../../components/UzbekistanMap"));
const Weather = lazy(() => import("../../../components/weather"));

const MainSec = () => {
  const { t } = useTranslation();

  return (
    <div className="myContainer flex flex-col lg:flex-row justify-center items-start gap-6 p-4">
      <div className="w-full lg:w-[70%]">
        <h1 className="text-3xl font-bold mb-4 text-main">{t("main_title")}</h1>

        <Suspense
          fallback={
            <div className="h-[450px] bg-gray-200 animate-pulse rounded-3xl flex items-center justify-center text-gray-500">
              {t("loading_map")}
            </div>
          }
        >
          <UzbekistanMap />
        </Suspense>
      </div>

      <div className="w-full lg:w-[30%]">
        <h1 className="text-3xl font-bold mb-4 text-main ">
          {t("weather_title")}
        </h1>

        <Suspense
          fallback={
            <div className="h-[300px] bg-gray-200 animate-pulse rounded-3xl flex items-center justify-center text-gray-500">
              {t("loading_weather")}
            </div>
          }
        >
          <Weather />
        </Suspense>
      </div>
    </div>
  );
};

export default MainSec;
