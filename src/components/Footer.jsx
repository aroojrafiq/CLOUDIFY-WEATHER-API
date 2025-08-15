import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white/10 backdrop-blur-lg p-3 text-center text-sm text-white absolute bottom-0 w-full">
      &copy; {new Date().getFullYear()} Weather App. All rights reserved
    </footer>
  );
}

