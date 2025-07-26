"use client";

import React from "react";

export type HotspotId = "desk" | "bookshelf" | "door" | "speaker" | "podium";

export type HotspotProps = {
  id: HotspotId;
  top: string;
  left: string;
  checked?: boolean;
  onClick: (id: HotspotId) => void;
};

export default function Hotspot({
  id,
  top,
  left,
  checked = false,
  onClick,
}: HotspotProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className={`absolute cursor-pointer transition-all duration-300 rounded-full border-2 border-white z-20
        ${checked ? "bg-red-500 opacity-30" : "bg-red-500 hover:bg-orange-400 opacity-80 hover:opacity-100"}
      `}
      style={{
        top,
        left,
        width: "32px",
        height: "32px",
      }}
    />
  );
}
