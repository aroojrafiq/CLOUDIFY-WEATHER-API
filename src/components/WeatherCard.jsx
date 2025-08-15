import React from "react";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

export default function WeatherCard({ data, unit = "C" }) {
  // Helpers
  const cToF = (c) => (c * 9) / 5 + 32;
  const msToKmh = (ms) => ms * 3.6;
  const msToMph = (ms) => ms * 2.23694;

  const main = data.weather?.[0]?.main || "Clear";
  const desc = data.weather?.[0]?.description || "";
  const tempC = data.main?.temp ?? 0;
  const temp = unit === "C" ? Math.round(tempC) : Math.round(cToF(tempC));

  const humidity = data.main?.humidity ?? 0;

  const windMs = data.wind?.speed ?? 0;
  const wind =
    unit === "C"
      ? `${msToKmh(windMs).toFixed(1)} km/h`
      : `${msToMph(windMs).toFixed(1)} mph`;

  // Precipitation can be under rain or snow, as last 1h or 3h totals (mm)
  const rain1h = data.rain?.["1h"];
  const rain3h = data.rain?.["3h"];
  const snow1h = data.snow?.["1h"];
  const snow3h = data.snow?.["3h"];

  let precipMm = 0;
  if (rain1h != null) precipMm = rain1h;
  else if (snow1h != null) precipMm = snow1h;
  else if (rain3h != null) precipMm = rain3h / 3;
  else if (snow3h != null) precipMm = snow3h / 3;

  // Better icon detection — checks both main & description
  const getIcon = (m, d) => {
    const k = (m + " " + d).toLowerCase();
    if (k.includes("thunder")) return <WiThunderstorm className="text-yellow-200 text-7xl drop-shadow" />;
    if (k.includes("rain") || k.includes("drizzle")) return <WiRain className="text-blue-300 text-7xl drop-shadow" />;
    if (k.includes("snow")) return <WiSnow className="text-blue-100 text-7xl drop-shadow" />;
    if (k.includes("cloud")) return <WiCloud className="text-gray-200 text-7xl drop-shadow" />;
    if (k.includes("mist") || k.includes("fog") || k.includes("haze") || k.includes("smoke"))
      return <WiFog className="text-gray-200 text-7xl drop-shadow" />;
    return <WiDaySunny className="text-yellow-300 text-7xl drop-shadow" />;
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg">
      {/* Top: City, Icon, Temp */}
      <div className="flex items-center justify-between gap-4">
        <div>
         <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
  {data.sys?.country ? `${data.name}, ${data.sys.country}` : data.name}
</h2>

          <p className="capitalize opacity-90">{desc}</p>
        </div>
        <div className="shrink-0">
          {getIcon(main, desc)}
        </div>
      </div>

      {/* Temperature */}
      <div className="mt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl md:text-6xl font-bold">{temp}°</span>
          <span className="text-xl md:text-2xl opacity-80"> {unit}</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-3 gap-3 text-sm md:text-base">
        <Metric label="Humidity" value={`${humidity}%`} />
        <Metric label="Wind" value={wind} />
        <Metric label="Precip" value={precipMm ? `${precipMm.toFixed(1)} mm` : "0 mm"} />
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 text-center">
      <p className="opacity-80">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}  