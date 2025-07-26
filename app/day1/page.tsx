'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Day1Scene.module.css';

const messages = [
  "──翌朝。",
  "昨日の出来事が、夢じゃなかったことを実感する。",
  "この中に、本当にAIがいる……？",
  "でも、誰もそんな風には見えなかった。",
  "でも……ゲームは始まるって言ってた。",
  "今日から、毎日“誰か”と入れ替わる。",
  "……見抜かないと。",
  "そうしないと、誰かが疑われて──",
  "3億円の借金を背負うことになる。",
  "今日は“自由行動”の時間が与えられている。",
  "参加者と話して、情報を集めよう。",
  "……まずは、誰に話しかけるべきだろう？",
];

export default function Day1Page() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const handleClick = () => {
    if (index < messages.length - 1) {
      setIndex(index + 1);
    } else {
      router.push('/day1/free'); // 次の自由行動パートへ
    }
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.background} />
      <div className={styles.messageBox}>
        {messages[index].split('\n').map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}
