"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TimerDisplay from "@/components/ui/TimerDisplay";
import Hotspot from "@/components/ui/Hotspot";
import MessageBox from "@/components/ui/MessageBox";
import CharacterSprite from "@/components/ui/CharacterSprite";
import BombChoices from "@/components/ui/BombChoices";
import { SpotId, MessageEntry } from "@/data/investigationMessages";
import {
  handleRed,
  handleBlue,
  handleBreak,
  handleBoth,
} from "@/lib/bombHandlers";
import {
  handleInspectSpot,
  advanceMessage,
} from "@/lib/investigationLogic";

export default function InvestigationPage() {
  const router = useRouter();

  const [background, setBackground] = useState("/images/classroom_bg.png");
  const [timer, setTimer] = useState(180);
  const [timerActive, setTimerActive] = useState(true);

  const [inspected, setInspected] = useState<Record<SpotId, boolean>>({
    desk: false,
    bookshelf: false,
    door: false,
    speaker: false,
    podium: false,
  });

  const [messages, setMessages] = useState<MessageEntry[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [choicesVisible, setChoicesVisible] = useState(true);
  const [currentSpot, setCurrentSpot] = useState<SpotId | null>(null);
  const [deskChoiceUsed, setDeskChoiceUsed] = useState(false);

  const [goToGameOver, setGoToGameOver] = useState(false);
  const [goToSuccess, setGoToSuccess] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const currentMessage = messages[messageIndex];
  const isMessageActive = messages.length > 0;

  useEffect(() => {
    if (!timerActive || timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  useEffect(() => {
    if (timer === 0) {
      setChoicesVisible(false);
      setShowChoices(false);
      setMessages([
        { speakerId: "narration", text: "タイムオーバー……" },
        { speakerId: "narration", text: "教室が光に包まれる。" },
      ]);
      setTimerActive(false);
      setGoToGameOver(true);
    }
  }, [timer]);

  const handleInspect = (id: SpotId) => {
    if (id === "desk") setDeskChoiceUsed(false);
    handleInspectSpot(
      id,
      isMessageActive,
      showChoices,
      setCurrentSpot,
      setInspected,
      setMessages,
      setMessageIndex,
      setBackground
    );
  };

  const handleMessageClick = () => {
    advanceMessage(
      messages,
      messageIndex,
      setMessages,
      setMessageIndex,
      setBackground,
      currentSpot,
      setIsFadingOut,
      goToGameOver,
      goToSuccess,
      router
    );
  };

  useEffect(() => {
    const isDeskSpot = currentSpot === "desk";
    const isDeskDone = inspected["desk"];
    const isMessageFinished = !isMessageActive;
    const isBackgroundBomb = background === "/images/desk_bomb.png";

    if (
      isDeskSpot &&
      isDeskDone &&
      isMessageFinished &&
      isBackgroundBomb &&
      !deskChoiceUsed &&
      !showChoices
    ) {
      setShowChoices(true);
      setChoicesVisible(true);
    }
  }, [isMessageActive, inspected, showChoices, currentSpot, deskChoiceUsed, background]);

  const handleBackToExplore = () => {
    setShowChoices(false);
    setChoicesVisible(false);
    setMessages([]);
    setMessageIndex(0);
    setCurrentSpot(null);
    setBackground("/images/classroom_bg.png");
  };

  const hideChoices = () => {
    setChoicesVisible(false);
    setShowChoices(false);
  };

  return (
    <main className="w-screen h-screen bg-black relative overflow-hidden flex flex-col">
      <Image
        src={background}
        alt="背景"
        fill
        className="object-cover z-0"
        priority
      />

      {isFadingOut && (
        <div className="absolute inset-0 bg-black opacity-80 z-[100] transition-opacity duration-1000" />
      )}

      {currentMessage?.speakerId && (
        <CharacterSprite
          speakerId={currentMessage.speakerId}
          expression={currentMessage.expression}
        />
      )}

      {timerActive && <TimerDisplay remainingTime={timer} />}

      {!isMessageActive && !showChoices && currentSpot !== "desk" && (
        <>
          <Hotspot id="desk" top="75%" left="65%" onClick={handleInspect} checked={inspected["desk"]} />
          <Hotspot id="bookshelf" top="50%" left="85%" onClick={handleInspect} checked={inspected["bookshelf"]} />
          <Hotspot id="door" top="50%" left="5%" onClick={handleInspect} checked={inspected["door"]} />
          <Hotspot id="speaker" top="20%" left="20%" onClick={handleInspect} checked={inspected["speaker"]} />
          <Hotspot id="podium" top="50%" left="45%" onClick={handleInspect} checked={inspected["podium"]} />
        </>
      )}

      {isMessageActive && (
        <MessageBox
          speakerId={currentMessage.speakerId}
          expression={currentMessage.expression}
          text={currentMessage.text}
          hasNext={messageIndex < messages.length - 1}
          onClick={handleMessageClick}
        />
      )}

      {showChoices && (
        <BombChoices
          hasHint={inspected["bookshelf"]}
          onRed={() => {
            setDeskChoiceUsed(true);
            handleRed(setMessages, setTimerActive, setGoToGameOver, hideChoices);
          }}
          onBlue={() => {
            setDeskChoiceUsed(true);
            handleBlue(setMessages, setTimerActive, setGoToGameOver, hideChoices);
          }}
          onBreak={() => {
            setDeskChoiceUsed(true);
            handleBreak(setMessages, setTimerActive, setGoToGameOver, hideChoices);
          }}
          onBoth={() => {
            setDeskChoiceUsed(true);
            handleBoth(setMessages, setTimerActive, setGoToSuccess, hideChoices);
          }}
          onCancel={handleBackToExplore}
          visible={choicesVisible}
        />
      )}
    </main>
  );
}
