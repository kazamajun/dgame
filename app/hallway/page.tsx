// app/hallway/page.tsx
"use client";

import React, { useState } from "react";
import styles from "./HallwayScene.module.css";
import Image from "next/image";
import Link from "next/link";

const messages = [
  {
    speaker: "千日コウ",
    text: "……無事のようで何より、\n新入りさん。\nここは安全ですが、長居は禁物ですわ。",
    expression: "/kou_smile.png",
  },
  {
    speaker: "星野こはる",
    text: "あなたは……？\nどうやってここに……？",
    expression: "/koharu_surprise.png",
  },
  {
    speaker: "千日コウ",
    text: "あら、自己紹介が遅れました。\n千日コウと申します。\n探偵見習いですの。",
    expression: "/kou_normal.png",
  },
  {
    speaker: "星野こはる",
    text: "私は星野こはる……。\nさっきの部屋から、\n何とか逃げ出してきたの。",
    expression: "/koharu_normal.png",
  },
  {
    speaker: "千日コウ",
    text: "ふふ、それは僥倖。\n二人なら可能性も増える。\nまずは情報を集めましょう。",
    expression: "/kou_smile.png",
  },
];

export default function HallwayScene() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const current = messages[currentMessageIndex];
  const isEnd = currentMessageIndex === messages.length - 1;

  const handleNext = () => {
    if (!isEnd) {
      setCurrentMessageIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className={styles.background}
        style={{ backgroundImage: "url('/bg_hallway.jpg')" }}
      />
      <div className={styles.overlay} />

      <img
        src={current.expression}
        alt="Character"
        className={`${styles.character} ${styles.right}`}
      />

      <div className={styles.messageBox} onClick={handleNext}>
        <div className={styles.speaker}>{current.speaker}</div>
        <div className={styles.messageText}>{current.text}</div>
      </div>

      {isEnd && (
        <div className={styles.nextBlock}>
          <Link href="/gym" className={styles.nextButton}>
            ▶ 体育館へ向かう
          </Link>
        </div>
      )}

      <button className={styles.saveButton}>セーブ</button>
    </div>
  );
}
