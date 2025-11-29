/** @format */

import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  useMap,
} from "react-leaflet";

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
  if (aqi <= 50) return "#55a84f";
  if (aqi <= 100) return "#ffd12f";
  if (aqi <= 150) return "#ff7b1a";
  if (aqi <= 200) return "#d93f2c";
  return "#6f1d1b"; // maroon
}

const UzbekistanMap = () => {
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
    <div className="">
      <div
        className="
        w-full
        h-[350px] md:h-[450px] lg:h-[530px] 
        rounded-3xl border border-main/40 
        shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] 
        overflow-hidden backdrop-blur-sm bg-white/60
      "
      >
        <MapContainer
          center={[41.2995, 69.2401]}
          zoom={6}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <GeoJSON data={regionsGeoJSON} style={() => regionStyle} />

          {renderRegionBadges()}

          <FitBoundsOnLoad geojson={regionsGeoJSON} />
        </MapContainer>
      </div>
    </div>
  );
};

export default UzbekistanMap;
