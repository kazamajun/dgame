// app/day1/meeting/components/ConversationModal.tsx
"use client";

import React from "react";
import styles from "../MeetingScene.module.css";

type Props = {
  participantId: string;
  onDeepTalk: () => void;
  onClose: () => void;
};

const conversationMap: Record<string, string[]> = {
  suzuki: [
    "鈴木メソッドをご存じですか？",
    "教育とは、洗脳の芸術です。",
    "私に疑いを向けるとは、生意気ですね。",
  ],
  zero: [
    "炭酸ゼロの新作が出たら絶対飲みますね。",
    "AIって、バグとかあるんですかね。",
    "なんか、俺っぽいやついません？",
  ],
  isoda: [
    "いっそしのう、なんて冗談よ。",
    "メイクは心の仮面だって言うでしょ？",
    "本物の私、見抜ける？",
  ],
  fuyuno: [
    "サンタって本当にいたら怖くない？",
    "ドッキリなら今すぐネタばらししてほしい〜",
    "僕、AIだったら面白い動画になるかも!",
  ],
};

export default function ConversationModal({ participantId, onDeepTalk, onClose }: Props) {
  const lines = conversationMap[participantId] || ["……（この人は何も話さないようだ）"];

  return (
    <div className={styles.conversationBox}>
      <div className={styles.textBox}>
        {lines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <div className={styles.buttonRow}>
        <button onClick={onDeepTalk}>深く会話する</button>
        <button onClick={onClose}>戻る</button>
      </div>
    </div>
  );
}
