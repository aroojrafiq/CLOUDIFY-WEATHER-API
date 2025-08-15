export default function getWeatherBg(condition) {
  if (!condition) return "bg-gradient-to-b from-slate-800 to-slate-900";

  switch (condition.toLowerCase()) {
    case "clear":
      return "bg-gradient-to-b from-blue-400 to-blue-600";
    case "clouds":
      return "bg-gradient-to-b from-gray-400 to-gray-600";
    case "rain":
      return "bg-gradient-to-b from-blue-700 to-gray-900";
    case "snow":
      return "bg-gradient-to-b from-blue-200 to-blue-500";
    case "thunderstorm":
      return "bg-gradient-to-b from-gray-800 to-black";
    default:
      return "bg-gradient-to-b from-slate-700 to-slate-900";
  }
}
