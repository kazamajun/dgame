"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GameOverPage() {
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // BGM停止（再生中のみ）
    const bgm = (window as any).bgm as HTMLAudioElement | undefined;
    if (bgm && !bgm.paused) {
      bgm.pause();
      bgm.currentTime = 0;
    }

    // 爆発SE再生
    const explosion = new Audio("/se/explosion.mp3");
    explosion.volume = 1.0;
    explosion.play().catch((e) => {
      console.warn("SE再生に失敗しました:", e);
    });

    // 1秒後にボタンを表示
    const timeout = setTimeout(() => {
      setShowButtons(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="w-screen h-screen bg-black relative overflow-hidden">
      {/* 背景画像 */}
      <Image
        src="/images/gameover_bg.jpg"
        alt="ゲームオーバー背景"
        fill
        className="object-cover z-0"
        priority
      />

      {/* コンテンツ */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white bg-black/50">
        <h1 className="text-5xl font-bold mb-6">GAME OVER</h1>
        <p className="text-lg mb-10">爆弾が爆発してしまった……。</p>

        {/* 遅延表示される選択肢ボタン */}
        <div
          className={`space-y-4 w-64 transition-opacity duration-500 ${
            showButtons ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            className="w-full bg-gray-700 text-black px-6 py-3 rounded hover:bg-white transition"
            onClick={() => router.push("/play/investigation")}
          >
            最後の場面からやり直す
          </button>
          <button
            className="w-full bg-gray-700 text-black px-6 py-3 rounded hover:bg-white transition"
            onClick={() => router.push("/")}
          >
            タイトル画面に戻る
          </button>
        </div>
      </div>
    </main>
  );
}
