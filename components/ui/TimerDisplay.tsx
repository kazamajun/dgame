// components/ui/TimerDisplay.tsx
import React from "react";

export type TimerDisplayProps = {
  remainingTime: number;
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ remainingTime }) => {
  const minutes = Math.floor(remainingTime / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (remainingTime % 60).toString().padStart(2, "0");

  const isDanger = remainingTime <= 30;

  return (
    <div
      className={`absolute top-4 right-4 text-2xl font-bold px-4 py-2 rounded-md bg-black bg-opacity-60 ${
        isDanger ? "text-red-500 animate-pulse" : "text-white"
      }`}
    >
      {minutes}:{seconds}
    </div>
  );
};

export default TimerDisplay;
