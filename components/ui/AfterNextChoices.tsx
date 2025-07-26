// /components/ui/AfterNextChoices.tsx
"use client";

import { useRouter } from "next/navigation";

export default function AfterNextChoices() {
  const router = useRouter();

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-4 w-[80%] max-w-xs">
      <button
        className="w-full bg-white text-black text-lg font-semibold py-3 rounded-lg shadow hover:bg-gray-200 transition"
        onClick={() => router.push("/hallway")}
      >
        ▶ 廊下へ進む
      </button>
      <button
        className="w-full bg-gray-700 text-white text-lg font-semibold py-3 rounded-lg shadow hover:bg-gray-500 transition"
        onClick={() => alert("※ セーブ画面は未実装です")}
      >
        💾 セーブする
      </button>
    </div>
  );
}
