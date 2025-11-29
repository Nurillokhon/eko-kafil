/** @format */

import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  useMap,
} from "react-leaflet";
import { WiDayCloudy } from "react-icons/wi";
import { FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";
import { useGetRequest } from "../service/requests";
import regions from "../constants/gis.regions.json";
import type { FeatureCollection, Feature } from "geojson";
import { useEffect } from "react";

const regionsGeoJSON: FeatureCollection = {
  type: "FeatureCollection",
  features: regions as unknown as Feature[],
};

const staticData: Record<
  string,
  { aqi: number; status: string; pollutant?: string }
> = {
  "Tashkent city": { aqi: 42, status: "Good", pollutant: "PM2.5" },
  "Namangan region": { aqi: 75, status: "Moderate", pollutant: "PM10" },
  "Tashkent region": { aqi: 68, status: "Moderate", pollutant: "PM2.5" },
  "Fergana region": { aqi: 82, status: "Moderate", pollutant: "PM10" },
  "Andijan region": { aqi: 95, status: "Moderate", pollutant: "PM2.5" },
  "Syrdarya region": { aqi: 58, status: "Moderate", pollutant: "PM2.5" },
  "Jizzakh region": { aqi: 87, status: "Moderate", pollutant: "PM10" },
  "Navoi region": { aqi: 45, status: "Good", pollutant: "PM2.5" },
  "Samarkand region": {
    aqi: 110,
    status: "Unhealthy for Sensitive",
    pollutant: "PM2.5",
  },
  "Kashkadarya province": {
    aqi: 102,
    status: "Unhealthy for Sensitive",
    pollutant: "PM2.5",
  },
  "Surkhandarya region": { aqi: 93, status: "Moderate", pollutant: "PM10" },
  "Bukhara region": { aqi: 55, status: "Moderate", pollutant: "PM2.5" },
  "Khorezm region": { aqi: 67, status: "Moderate", pollutant: "PM10" },
  "Republic of Karakalpakstan": {
    aqi: 67,
    status: "Moderate",
    pollutant: "PM10",
  },
};

function getAqiColor(aqi: number | null) {
  if (aqi === null) return "#999";
  if (aqi <= 50) return "#55a84f"; // green
  if (aqi <= 100) return "#ffd12f"; // yellow
  if (aqi <= 150) return "#ff7b1a"; // orange
  if (aqi <= 200) return "#d93f2c"; // red
  return "#6f1d1b"; // maroon
}

const UzbekistanMap = () => {
  const { data } = useGetRequest<any>({ url: "weather/weakly/" });

  const todayWeather = data?.[0];
  const regionStyle = {
    color: "#2563eb",
    weight: 1,
    fillColor: "#3b82f6",
    fillOpacity: 0.35,
  };

  function FitBoundsOnLoad({ geojson }: any) {
    const map = useMap();

    useEffect(() => {
      const layer = L.geoJSON(geojson);
      map.fitBounds(layer.getBounds(), {
        padding: [4, 5],
      });
    }, [geojson, map]);

    return null;
  }

  const renderRegionBadges = () => {
    return regionsGeoJSON.features.map((feature, idx) => {
      const propName =
        (feature.properties && (feature.properties as any).region_name_en) ||
        (feature.properties && (feature.properties as any).region) ||
        `region-${idx}`;

      const info = staticData[propName] ?? null;

      const layer = L.geoJSON(feature as any);
      const center = layer.getBounds().getCenter();

      const aqiValue = info ? info.aqi : 0;
      const aqiColor = getAqiColor(aqiValue);
      const html = `
        <div class="aqi-badge" style="
          display:inline-flex;
          align-items:center;
          justify-content:center;
          flex-direction:column;
          min-width:56px;
          padding:6px 8px;
          border-radius:10px;
          box-shadow:0 4px 10px rgba(0,0,0,0.12);
          background:linear-gradient(180deg, rgba(255,255,255,0.9), rgba(250,250,250,0.85));
          border: 2px solid ${aqiColor};
          font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
        ">
          <div style="font-size:14px; font-weight:700; color:${aqiColor};">${
        aqiValue !== null ? aqiValue : "--"
      }</div>
          <div style="font-size:10px; color:#333; margin-top:2px;">${
            info?.pollutant ?? ""
          }</div>
        </div>
      `;

      const icon = L.divIcon({
        html,
        className: "",
        iconSize: [60, 36],
        iconAnchor: [30, 18],
      });

      return (
        <Marker
          key={`badge-${idx}`}
          position={[center.lat, center.lng]}
          icon={icon}
        />
      );
    });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-6 p-4">
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
          zoom={6}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <GeoJSON data={regionsGeoJSON} style={() => regionStyle} />

          {renderRegionBadges()}

          <FitBoundsOnLoad geojson={regionsGeoJSON} />
        </MapContainer>
      </div>

      <div className="w-full lg:w-[30%] space-y-6">
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

        {/* ALERTS */}
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
    </div>
  );
};

export default UzbekistanMap;
