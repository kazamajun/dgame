// /lib/investigationLogic.ts
import { Dispatch, SetStateAction } from "react";
import { SpotId, MessageEntry, spotMessages } from "@/data/investigationMessages";

export type BackgroundSetter = Dispatch<SetStateAction<string>>;
export type MessageSetter = Dispatch<SetStateAction<MessageEntry[]>>;
export type NumberSetter = Dispatch<SetStateAction<number>>;
export type SpotSetter = Dispatch<SetStateAction<Record<SpotId, boolean>>>;
export type SpotIdSetter = Dispatch<SetStateAction<SpotId | null>>;

export function handleInspectSpot(
  id: SpotId,
  isMessageActive: boolean,
  showChoices: boolean,
  setCurrentSpot: SpotIdSetter,
  setInspected: SpotSetter,
  setMessages: MessageSetter,
  setMessageIndex: NumberSetter,
  setBackground: BackgroundSetter
) {
  if (isMessageActive || showChoices) return;

  setCurrentSpot(id);
  setInspected((prev) => ({ ...prev, [id]: true }));

  const sequence = spotMessages[id] || [];
  setMessages(sequence);
  setMessageIndex(0);

  if (sequence[0]?.bg) {
    setBackground(sequence[0].bg);
  }
}

export function advanceMessage(
  messages: MessageEntry[],
  messageIndex: number,
  setMessages: MessageSetter,
  setMessageIndex: NumberSetter,
  setBackground: BackgroundSetter,
  currentSpot: SpotId | null,
  setIsFadingOut: Dispatch<SetStateAction<boolean>>,
  goToGameOver: boolean,
  goToSuccess: boolean,
  router: any // NextRouter type optional
) {
  const next = messageIndex + 1;

  if (next < messages.length) {
    if (messages[next].bg) {
      setBackground(messages[next].bg);
    }
    setMessageIndex(next);
  } else {
    setMessages([]);
    setMessageIndex(0);

    if (currentSpot !== "desk") {
      setBackground("/images/classroom_bg.png");
    }

    if (goToGameOver) {
      setIsFadingOut(true);
      setTimeout(() => {
        router.push("/gameover");
      }, 1000);
    } else if (goToSuccess) {
      setIsFadingOut(true);
      setTimeout(() => {
        router.push("/play/after");
      }, 1000);
    }
  }
}
