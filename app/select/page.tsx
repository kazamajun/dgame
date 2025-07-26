// app/select/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./SelectScene.module.css";

const characters = [
  { id: "suzuki", name: "鈴木導一", image: "/suzuki.png" },
  { id: "zero", name: "ゼロ", image: "/zero.png" },
  { id: "gozan", name: "剛山源二", image: "/gozan.png" },
  { id: "fuyuno", name: "冬野三太", image: "/fuyuno.png" },
  { id: "isoda", name: "磯田しの", image: "/isoda.png" },
  { id: "goban", name: "五番町の母", image: "/goban.png" },
  { id: "sukima", name: "隙間むつお", image: "/sukima.png" },
];

export default function SelectPage() {
  const [talkedTo, setTalkedTo] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const handleCharacterClick = (id: string) => {
    if (!talkedTo.includes(id)) setSelected(id);
  };

  const handleTalk = () => {
    if (selected) {
      setTalkedTo((prev) => [...prev, selected]);
      setSelected(null);
      alert(`「${characters.find((c) => c.id === selected)?.name}」と会話を始めます…`);
    }
  };

  const handleCancel = () => setSelected(null);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>誰に話しかける？</h2>
      <div className={styles.grid}>
        {characters.map((char) => (
          <div
            key={char.id}
            className={`${styles.character} ${talkedTo.includes(char.id) ? styles.talked : ""}`}
            onClick={() => handleCharacterClick(char.id)}
          >
            <Image src={char.image} alt={char.name} width={100} height={100} />
            <div className={styles.name}>{char.name}</div>
          </div>
        ))}
      </div>

      {selected && (
        <div className={styles.dialogueBox}>
          <p>{characters.find((c) => c.id === selected)?.name} に話しかけますか？</p>
          <button onClick={handleTalk}>はい</button>
          <button onClick={handleCancel}>いいえ</button>
        </div>
      )}

      <Link href="/hallway">
        <button className={styles.backButton}>← 廊下にもどる</button>
      </Link>
    </div>
  );
}
