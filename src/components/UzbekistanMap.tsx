/** @format */

import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  useMap,
  Popup,
} from "react-leaflet";

import regions from "../constants/gis.regions.json";
import type { FeatureCollection, Feature } from "geojson";
import { useEffect } from "react";
import { useGetRequest } from "../service/requests";
const regionsGeoJSON: FeatureCollection = {
  type: "FeatureCollection",
  features: regions as unknown as Feature[],
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
  const { data } = useGetRequest<any>({ url: "/weather/daily/" });

  if (!data) {
    return (
      <div className="w-full h-[350px] md:h-[450px] lg:h-[530px] rounded-3xl bg-gray-100 animate-pulse" />
    );
  }

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
    }, [geojson, map, data]);

    return null;
  }

  const renderRegionBadges = () => {
    return regionsGeoJSON.features.map((feature, idx) => {
      const propName =
        (feature.properties && (feature.properties as any).parent_code) ||
        (feature.properties && (feature.properties as any).region) ||
        `region-${idx}`;

      const info = data[propName] ?? null;

      const layer = L.geoJSON(feature as any);
      const center = layer.getBounds().getCenter();

      const aqiValue = info ? info.aqi : null;
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
          font-family: Inter, system-ui;
        ">
          <div style="font-size:14px; font-weight:700; color:${aqiColor};">
            ${aqiValue ?? "--"}
          </div>
          <div style="font-size:10px; color:#333; margin-top:2px;">
            ${info?.pollutant ?? ""}
          </div>
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
        >
          <Popup className="">
            <div className={`space-y-1 text-sm`}>
              <div className="font-semibold text-gray-800">{propName}</div>

              <div>
                <span className="font-medium">AQI:</span> {aqiValue ?? "--"}
              </div>

              <div>
                <span className="font-medium">Pollutant:</span>{" "}
                {info?.pollutant ?? "Noma’lum"}
              </div>

              <div>
                <span className="font-medium">Nomi:</span>{" "}
                {info?.region_name ?? "—"}
              </div>
            </div>
          </Popup>
        </Marker>
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
