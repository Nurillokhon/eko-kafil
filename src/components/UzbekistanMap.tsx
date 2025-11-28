/** @format */

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { WiDayCloudy } from "react-icons/wi";
import { FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";

const UzbekistanMap = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-5 p-4">
      <div className="w-full lg:w-[70%] h-[350px] md:h-[450px] lg:h-[527px] rounded-2xl overflow-hidden border border-main">
        <MapContainer
          center={[41.2995, 69.2401]}
          zoom={8}
          scrollWheelZoom={false}
          className="w-full h-full rounded-2xl border border-main"
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

      <div className="w-full lg:w-[30%] border border-main rounded-2xl">
        <div className="w-full mx-auto p-2 space-y-6">
          <div className="rounded-2xl p-6 text-white shadow-md bg-gradient-to-br from-green-400 to-blue-600">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-5xl font-bold">24°C</h1>
                <p className="text-lg">Partly Cloudy</p>
              </div>
              <WiDayCloudy size={60} />
            </div>

            <div className="border-t border-white/40 mt-6 pt-4 grid grid-cols-3 text-sm">
              <div className="text-center">
                <p className="opacity-90">Humidity</p>
                <p className="text-lg font-semibold">45%</p>
              </div>
              <div className="text-center">
                <p className="opacity-90">Wind</p>
                <p className="text-lg font-semibold">3.5 m/s</p>
              </div>
              <div className="text-center">
                <p className="opacity-90">Pressure</p>
                <p className="text-lg font-semibold">1013 hPa</p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold">Health Alerts</h2>

          <div className="border border-orange-400 bg-orange-50 rounded-xl p-4 flex gap-3">
            <FaExclamationTriangle size={22} className="text-orange-500 mt-1" />
            <div>
              <h3 className="font-semibold text-orange-600">
                Moderate Air Quality Alert
              </h3>
              <p className="text-sm text-gray-700">
                Sensitive groups should limit prolonged outdoor activities in
                Namangan and Fergana regions.
              </p>
            </div>
          </div>

          {/* Good alert */}
          <div className="border border-green-500 bg-green-50 rounded-xl p-4 flex gap-3">
            <FaInfoCircle size={22} className="text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold text-green-700">Good Air Quality</h3>
              <p className="text-sm text-gray-700">
                Air quality is excellent in Nukus and Urgench. Perfect
                conditions for outdoor activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UzbekistanMap;
