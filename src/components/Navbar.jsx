import React from "react";
import { WiDaySunny } from "react-icons/wi";

export default function Navbar() {
  return (
    <nav className="bg-white/10 backdrop-blur-lg p-4 flex items-center justify-center gap-2 shadow-lg">
      <WiDaySunny className="text-yellow-400 text-3xl" />
      <h1 className="text-2xl font-bold text-white">Weather App</h1>
    </nav>
  );
}

