/** @format */

import { FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { useGetRequest } from "../service/requests";
import { WiDayCloudy } from "react-icons/wi";
import { useTranslation } from "react-i18next";

const Weather = () => {
  const { data } = useGetRequest<any>({ url: "weather/weakly/" });
  const { t } = useTranslation();

  const todayWeather = data?.[0];

  return (
    <div className="w-full space-y-6">
      <div
        className="
          rounded-3xl p-6 border border-main/40 
          shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] 
          bg-white/70 backdrop-blur-xl
          hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)]
          transition-all duration-300
        "
      >
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-bold text-main tracking-tight">
              {todayWeather
                ? Math.round(todayWeather.temperature_2m_max) + "°C"
                : "--"}
            </h1>

            <p className="text-lg text-gray-600 font-medium">
              {todayWeather?.rain_sum > 0 ? t("rainy") : t("partly_cloudy")}
            </p>
          </div>

          <WiDayCloudy size={68} className="text-main/90 drop-shadow-sm" />
        </div>

        <div className="border-t border-main/20 mt-6 pt-4 grid grid-cols-3 text-sm">
          <div className="text-center">
            <p className="text-gray-500">{t("humidity")}</p>
            <p className="text-xl font-semibold text-main">
              {todayWeather ? "45%" : "--"}
            </p>
          </div>

          <div className="text-center">
            <p className="text-gray-500">{t("wind")}</p>
            <p className="text-xl font-semibold text-main">
              {todayWeather
                ? todayWeather.wind_speed_10m_max.toFixed(1) + " m/s"
                : "--"}
            </p>
          </div>

          <div className="text-center">
            <p className="text-gray-500">{t("pressure")}</p>
            <p className="text-xl font-semibold text-main">1013</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-main tracking-tight pl-1">
        {t("health_alerts")}
      </h2>

      <div
        className="
          border border-orange-300 bg-orange-50/70 
          backdrop-blur-md rounded-2xl p-4 flex gap-3
          shadow-sm hover:shadow-md transition-all duration-200
        "
      >
        <FaExclamationTriangle size={24} className="text-orange-500 mt-1" />
        <div>
          <h3 className="text-orange-700 font-semibold">
            {t("moderate_air_quality")}
          </h3>

          <p className="text-sm text-gray-700 leading-relaxed">
            {t("moderate_air_quality_desc")}
          </p>
        </div>
      </div>

      <div
        className="
          border border-green-300 bg-green-50/70 
          backdrop-blur-md rounded-2xl p-4 flex gap-3
          shadow-sm hover:shadow-md transition-all duration-200
        "
      >
        <FaInfoCircle size={22} className="text-green-600 mt-1" />
        <div>
          <h3 className="text-green-700 font-semibold">
            {t("good_air_quality")}
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {t("good_air_quality_desc")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
