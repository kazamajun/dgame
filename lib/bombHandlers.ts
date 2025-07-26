import { Dispatch, SetStateAction } from "react";
import { MessageEntry } from "@/data/investigationMessages";

type Setter<T> = Dispatch<SetStateAction<T>>;

export function handleRed(
  setMessages: Setter<MessageEntry[]>,
  setTimerActive: Setter<boolean>,
  setGoToGameOver: Setter<boolean>,
  hideChoices: () => void
) {
  hideChoices();
  setTimerActive(false);
  setMessages([
    { speakerId: "koharu", expression: "think", text: "……何も起きない？" },
    { speakerId: "narration", text: "爆弾が爆発した……" },
  ]);
  setGoToGameOver(true);
}

export function handleBlue(
  setMessages: Setter<MessageEntry[]>,
  setTimerActive: Setter<boolean>,
  setGoToGameOver: Setter<boolean>,
  hideChoices: () => void
) {
  hideChoices();
  setTimerActive(false);
  setMessages([
    { speakerId: "koharu", expression: "think", text: "……もしかして……" },
    { speakerId: "narration", text: "爆弾が爆発した……" },
  ]);
  setGoToGameOver(true);
}

export function handleBreak(
  setMessages: Setter<MessageEntry[]>,
  setTimerActive: Setter<boolean>,
  setGoToGameOver: Setter<boolean>,
  hideChoices: () => void
) {
  hideChoices();
  setTimerActive(false);
  setMessages([
    { speakerId: "koharu", expression: "surprise", text: "えいやっ！" },
    { speakerId: "narration", text: "爆弾が爆発した……" },
  ]);
  setGoToGameOver(true);
}

export function handleBoth(
  setMessages: Setter<MessageEntry[]>,
  setTimerActive: Setter<boolean>,
  setGoToSuccess: Setter<boolean>,
  hideChoices: () => void
) {
  hideChoices(); // ✅ 成功時も選択肢を消す
  setTimerActive(false);
  setMessages([
    { speakerId: "koharu", expression: "normal", text: "赤と青……同時に！" },
    { speakerId: "narration", text: "タイマーが止まった……" },
  ]);
  setGoToSuccess(true);
}
