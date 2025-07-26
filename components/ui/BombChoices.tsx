"use client";

import React from "react";

type BombChoicesProps = {
  hasHint: boolean;
  onRed: () => void;
  onBlue: () => void;
  onBreak: () => void;
  onBoth: () => void;
  onCancel: () => void;
  visible: boolean;
};

export default function BombChoices({
  hasHint,
  onRed,
  onBlue,
  onBreak,
  onBoth,
  onCancel,
  visible,
}: BombChoicesProps) {
  if (!visible) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[80] space-y-3 flex flex-col items-center">
      <button className="bg-red-600 text-white px-6 py-2 rounded shadow-lg" onClick={onRed}>
        赤いボタンを押す
      </button>
      <button className="bg-blue-600 text-white px-6 py-2 rounded shadow-lg" onClick={onBlue}>
        青いボタンを押す
      </button>
      {hasHint ? (
        <button className="bg-purple-600 text-white px-6 py-2 rounded shadow-lg" onClick={onBoth}>
          両方のボタンを押す
        </button>
      ) : (
        <button className="bg-gray-600 text-white px-6 py-2 rounded shadow-lg" onClick={onBreak}>
          力ずくで破壊する
        </button>
      )}
      <button className="bg-black text-white px-6 py-2 rounded shadow-lg" onClick={onCancel}>
        まだ探索をする
      </button>
    </div>
  );
}
