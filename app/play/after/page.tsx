// /play/after/page.tsx（修正：メッセージと立ち絵を同時に非表示）
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MessageBox from "@/components/ui/MessageBox";
import CharacterSprite from "@/components/ui/CharacterSprite";
import AfterHotspot from "@/components/ui/AfterHotspot";
import AfterNextChoices from "@/components/ui/AfterNextChoices";
import { afterMessages } from "@/data/afterMessages";
import { afterSpotMessages, AfterSpotId, AfterSpotResponse } from "@/data/afterHotspotMessages";
import { afterStoryMessages } from "@/data/afterStoryMessages";

export default function AfterPage() {
  const [phase, setPhase] = useState<"message" | "investigation" | "story">("message");
  const [step, setStep] = useState(0);
  const [background, setBackground] = useState("/images/classroom_bg.png");
  const [messages, setMessages] = useState(afterMessages);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [showCharacter, setShowCharacter] = useState(true);
  const [inspected, setInspected] = useState<Record<AfterSpotId, boolean>>({ desk: false, door: false, floor: false });
  const [pencilFound, setPencilFound] = useState(false);
  const [currentSpotMessages, setCurrentSpotMessages] = useState<AfterSpotResponse[]>([]);

  const current = messages[messageIndex];

  const handleMessageClick = () => {
    if (messageIndex < messages.length - 1) {
      const next = messageIndex + 1;
      const bg = messages[next].bg;
      if (bg) setBackground(bg);
      setMessageIndex(next);
    } else {
      setShowMessage(false);
      setShowCharacter(false);
      if (phase === "message") {
        setPhase("investigation");
      } else if (phase === "story") {
        // 終了後に選択肢が表示される
      }
    }
  };

  const handleSpotInspect = (id: AfterSpotId) => {
    const isAlreadyInspected = inspected[id];
    const response = afterSpotMessages[id](isAlreadyInspected, pencilFound);
    setCurrentSpotMessages(response.messages);
    if (response.foundPencil) setPencilFound(true);
    setInspected((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    if (
      inspected.desk &&
      inspected.door &&
      inspected.floor &&
      currentSpotMessages.length === 0 &&
      phase === "investigation"
    ) {
      setPhase("story");
      setMessages(afterStoryMessages);
      setMessageIndex(0);
      setShowMessage(true);
      setShowCharacter(true);
    }
  }, [inspected, currentSpotMessages, phase, pencilFound]);

  return (
    <main className="w-screen h-screen bg-black relative overflow-hidden" onClick={handleMessageClick}>
      <Image src={background} alt="背景" fill className="object-cover z-0" priority />

      {/* キャラクター表示（showCharacter 制御） */}
      {showCharacter && current?.speakerId && (
        <CharacterSprite speakerId={current.speakerId} expression={current.expression} />
      )}

      {showMessage && current && (
        <MessageBox
          speakerId={current.speakerId}
          expression={current.expression}
          text={current.text}
          hasNext={messageIndex < messages.length - 1}
          onClick={handleMessageClick}
        />
      )}

      {phase === "investigation" && currentSpotMessages.length === 0 && (
        <>
          <AfterHotspot id="desk" top="50%" left="40%" onInspect={handleSpotInspect} checked={inspected.desk} />
          <AfterHotspot id="door" top="45%" left="5%" onInspect={handleSpotInspect} checked={inspected.door} />
          <AfterHotspot id="floor" top="80%" left="60%" onInspect={handleSpotInspect} checked={inspected.floor} />
        </>
      )}

      {currentSpotMessages.length > 0 && (
        <MessageBox
          speakerId={currentSpotMessages[0].speakerId}
          expression={currentSpotMessages[0].expression}
          text={currentSpotMessages[0].text}
          hasNext={false}
          onClick={() => setCurrentSpotMessages([])}
        />
      )}

      {phase === "story" && !showMessage && <AfterNextChoices />}
    </main>
  );
}
