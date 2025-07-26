// /app/save/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { listAllSaves, saveToSlot, SaveSlotId, SaveData } from "@/lib/save";

export default function SavePage() {
  const router = useRouter();
  const [saves, setSaves] = useState<{ slot: SaveSlotId; data: SaveData | null }[]>([]);

  useEffect(() => {
    setSaves(listAllSaves());
  }, []);

  const handleSave = (slot: SaveSlotId) => {
    const now: SaveData = {
      checkpoint: "after",
      phase: "story",
      bg: "/images/classroom_bg.png",
      timestamp: Date.now(),
    };
    saveToSlot(slot, now);
    alert(`スロット ${slot} にセーブしました`);
    router.back();
  };

  return (
    <main className="w-screen h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">セーブメニュー</h1>
      <div className="space-y-4 w-full max-w-md">
        {saves.map(({ slot, data }) => (
          <div key={slot} className="bg-gray-800 rounded-lg p-4 shadow">
            <div className="mb-2">
              <strong>スロット {slot}</strong>
              <div className="text-sm text-gray-300">
                {data ? `保存済み (${new Date(data.timestamp).toLocaleString()})` : "空きスロット"}
              </div>
            </div>
            <button
              onClick={() => handleSave(slot)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              {data ? "上書きセーブ" : "ここにセーブする"}
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => router.back()}
        className="mt-8 text-sm text-gray-400 underline"
      >
        戻る
      </button>
    </main>
  );
}
