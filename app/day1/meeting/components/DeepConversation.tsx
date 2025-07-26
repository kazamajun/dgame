
"use client"
import React, { useState } from "react";
import styles from "../MeetingScene.module.css";

type DeepConversationProps = {
  participantId: string;
  onFinish: () => void;
  onClose?: () => void; // ← ここを追加
};

// 仮の会話データ
const deepConversations: Record<string, string[]> = {
  suzuki: [
    "私は教育のプロです。",
    "鈴木メソッドを広めるのが使命なんです。",
    "人間の感情は…処理が難しいですね。", // ← ここに「らしくない」可能性
  ],
  // 他キャラも追加可能
};

export default function DeepConversation({
  participantId,
  onFinish,
  onClose, // ← 受け取り
}: DeepConversationProps) {
  const lines = deepConversations[participantId] || ["……会話は続かないようだ。"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < lines.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinish(); // 会話終了
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.deepBox}>
      <div className={styles.textBox}>
        <p>{lines[currentIndex]}</p>
      </div>

      <div className={styles.buttonRow}>
        <button onClick={handleBack} disabled={currentIndex === 0}>
          戻る
        </button>
        <button onClick={handleNext}>
          {currentIndex < lines.length - 1 ? "次へ" : "終了"}
        </button>
        {onClose && (
          <button onClick={onClose}>
            メニューに戻る
          </button>
        )}
      </div>
    </div>
  );
}
