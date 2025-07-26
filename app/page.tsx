// app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [messageVisible, setMessageVisible] = useState(false);

  const handleShowMessage = () => {
    setMessageVisible(true);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8">
      <h1 className="text-6xl font-bold">DGAME</h1>

      {/* プレイ開始ボタン */}
      <Link
        href="/play/start"
        onClick={() => {
          const se = new Audio("/sounds/click.mp3");
          se.volume = 0.5;
          se.play();
        }}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-800 rounded-lg text-lg transition"
      >
        プレイ開始
      </Link>

      {/* メッセージ表示ボタン */}
      <button
        onClick={handleShowMessage}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-lg transition"
      >
        メッセージを表示
      </button>
      {messageVisible && <p className="text-xl mt-4">ようこそ</p>}

      {/* セーブ読込ボタン */}
      <Link
        href="/save"
        className="px-6 py-3 bg-gray-600 hover:bg-gray-800 rounded-lg text-lg transition"
      >
        セーブ読込
      </Link>
    </main>
  );
}
