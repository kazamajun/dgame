// /components/ui/AfterHotspot.tsx
"use client";

import React from "react";
import { AfterSpotId } from "@/data/afterHotspotMessages";

type AfterHotspotProps = {
  id: AfterSpotId;
  top: string;
  left: string;
  checked: boolean;
  onInspect: (id: AfterSpotId) => void;
};

export default function AfterHotspot({
  id,
  top,
  left,
  checked,
  onInspect,
}: AfterHotspotProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onInspect(id);
      }}
      className={`absolute cursor-pointer transition-all duration-300 rounded-full border-2 border-white z-20
        ${checked ? "bg-red-500 opacity-30" : "bg-red-500 hover:bg-orange-400 opacity-80 hover:opacity-100"}`}
      style={{
        top,
        left,
        width: "32px",
        height: "32px",
      }}
    />
  );
}
