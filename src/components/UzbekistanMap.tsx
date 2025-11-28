/** @format */

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { WiDayCloudy } from "react-icons/wi";
import { FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";

const UzbekistanMap = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-6 p-4">
      {/* MAP with soft shadow */}
      <div
        className="
        w-full lg:w-[70%] 
        h-[350px] md:h-[450px] lg:h-[530px] 
        rounded-3xl border border-main/40 
        shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] 
        overflow-hidden backdrop-blur-sm bg-white/60
      "
      >
        <MapContainer
          center={[41.2995, 69.2401]}
          zoom={8}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[41.2995, 69.2401]}>
            <Popup>Toshkent markazi</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-[30%] space-y-6">
        {/* WEATHER CARD — Creative glass style */}
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
                24°C
              </h1>
              <p className="text-lg text-gray-600 font-medium">Partly Cloudy</p>
            </div>
            <WiDayCloudy size={68} className="text-main/90 drop-shadow-sm" />
          </div>

          {/* Stats */}
          <div className="border-t border-main/20 mt-6 pt-4 grid grid-cols-3 text-sm">
            <div className="text-center">
              <p className="text-gray-500">Humidity</p>
              <p className="text-xl font-semibold text-main">45%</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Wind</p>
              <p className="text-xl font-semibold text-main">3.5 m/s</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Pressure</p>
              <p className="text-xl font-semibold text-main">1013</p>
            </div>
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-main tracking-tight pl-1">
          Health Alerts
        </h2>

        {/* ALERT 1 — Soft creative */}
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
              Sensitive groups should limit prolonged outdoor activities in
              Namangan and Fergana.
            </p>
          </div>
        </div>

        {/* ALERT 2 — Soft creative */}
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
              Air quality is excellent in Nukus and Urgench. Ideal for outdoor
              activity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UzbekistanMap;
