"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { messages } from "@/data/IntroScript";
import MessageBox from "@/components/ui/MessageBox";
import CharacterSprite from "@/components/ui/CharacterSprite";

export default function StartScene() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [background, setBackground] = useState("/images/black.png");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const current = messages[step];
    const bg = current?.bg ?? background;
    if (bg !== background) setBackground(bg);

    if (current) {
      console.log(`[STEP] ${step + 1} / ${messages.length}`);
      console.log(`[SPEAKER] ${current.speakerId}`);
      console.log(`[TEXT] ${current.text}`);
    } else {
      console.warn("messages[step] is undefined", step);
    }
  }, [step]);

  const handleClick = () => {
    if (locked) return;
    setLocked(true);

    const nextstep =step + 1;

    if (nextstep >= messages.length) {
      console.log("✅ 最終メッセージに到達、showMessageをfalseにします");
      setShowMessage(false);
      return;
    }
    setStep(nextstep);

    setTimeout(() => {
      setLocked(false);
    }, 100);
  };

  const current = messages[step];

  return (
    <main
      className="w-screen h-screen bg-black relative overflow-hidden"
      onClick={handleClick}
    >
      {/* 背景 */}
      <Image
        src={background}
        alt="背景"
        fill
        className="object-cover z-0"
        priority
      />

      {/* キャラクター立ち絵（あれば） */}
      {showMessage && current?.speakerId && (
        <CharacterSprite
          speakerId={current.speakerId}
          expression={current.expression}
        />
      )}

      {/* メッセージ表示 */}
      {showMessage && current && (
        <MessageBox
          speakerId={current.speakerId}
          expression={current.expression}
          text={current.text}
          hasNext={!!messages[step + 1]}
          onClick={handleClick}
        />
      )}

      {/* 最後に探索ボタン表示 */}
      {!showMessage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <button
            className="px-6 py-3 bg-white text-black text-lg rounded-lg shadow-md"
            onClick={() => router.push("/play/investigation")}
          >
            探索を開始する
          </button>
        </div>
      )}
    </main>
  );
}
