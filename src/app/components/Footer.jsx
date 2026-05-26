"use client";

import { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";

export default function Footer() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const liveDate = now.toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const liveTime = now.toLocaleTimeString("en-PK", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <footer className="border-t border-zinc-800 py-8 px-6 text-center">
      <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold mb-2">
        <FaCode />
        <span>M Naveed</span>
      </div>

      <p className="text-zinc-400 text-sm mb-1">
        {liveDate} | {liveTime}
      </p>

      <p className="text-zinc-600 text-xs">
        © {now.getFullYear()} Portfolio. All rights reserved.
      </p>
    </footer>
  );
}