/** @format */

import { FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { useGetRequest } from "../service/requests";
import { WiDayCloudy } from "react-icons/wi";

const Weather = () => {
  const { data } = useGetRequest<any>({ url: "weather/weakly/" });

  const todayWeather = data?.[0];
  return (
    <div className="w-full  space-y-6">
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
              {todayWeather?.rain_sum > 0 ? "Rainy" : "Partly Cloudy"}
            </p>
          </div>
          <WiDayCloudy size={68} className="text-main/90 drop-shadow-sm" />
        </div>

        <div className="border-t border-main/20 mt-6 pt-4 grid grid-cols-3 text-sm">
          <div className="text-center">
            <p className="text-gray-500">Humidity</p>
            <p className="text-xl font-semibold text-main">
              {todayWeather ? "45%" : "--"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Wind</p>
            <p className="text-xl font-semibold text-main">
              {todayWeather
                ? todayWeather.wind_speed_10m_max.toFixed(1) + " m/s"
                : "--"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Pressure</p>
            <p className="text-xl font-semibold text-main">1013</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-main tracking-tight pl-1">
        Health Alerts
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
            Moderate Air Quality Alert
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Sensitive groups should limit prolonged outdoor activities.
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
          <h3 className="text-green-700 font-semibold">Good Air Quality</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Air quality is excellent today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
