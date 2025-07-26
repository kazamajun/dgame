'use client';

import React, { useState } from 'react';
import styles from './AfterScene.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Character = {
  id: string;
  name: string;
  image: string;
  message: string[];
  talked: boolean;
};

const initialCharacters: Character[] = [
  {
    id: 'genji',
    name: '剛山源二',
    image: '/images/genji.png',
    message: ['……なんだかよくわからねぇが、自己紹介くらいしとくか。', '俺は剛山源二。50歳、土木工事の親方だ。'],
    talked: false
  },
  {
    id: 'shino',
    name: '磯田しの',
    image: '/images/shino.png',
    message: ['いっそしのう……ってくらい意味不明な状況だわ……', '磯田しの、インフルエンサーしてます。'],
    talked: false
  },
  {
    id: 'zero',
    name: 'ゼロ',
    image: '/images/zero.png',
    message: ['天才ハッカー、ゼロって呼ばれてる。', '……コーラある？'],
    talked: false
  },
  {
    id: 'suzuki',
    name: '鈴木導一',
    image: '/images/suzuki.png',
    message: ['教育は未来をつくる……。', '鈴木導一、教育者だ。'],
    talked: false
  },
  {
    id: 'gobanchou',
    name: '五番町の母',
    image: '/images/gobanchou.png',
    message: ['占い師よ。5割で当てる。', '信じるか信じないかはあなた次第。'],
    talked: false
  },
  {
    id: 'santa',
    name: '冬野三太',
    image: '/images/santa.png',
    message: ['子供に夢を！ 冬野三太！', 'プレゼント企画系YouTuberです！'],
    talked: false
  },
  {
    id: 'mutsuo',
    name: '隙間むつお',
    image: '/images/mutsuo.png',
    message: ['ポエムに生き、', 'すき間に沈む、隙間むつお……'],
    talked: false
  },
];

export default function AfterScene() {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [dialogue, setDialogue] = useState<string[]>([]);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showEndButton, setShowEndButton] = useState(false);
  const router = useRouter();

  const handleSelect = (id: string) => {
    const char = characters.find(c => c.id === id);
    if (!char || char.talked) return;
    setSelectedId(id);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (!selectedId) return;
    const char = characters.find(c => c.id === selectedId);
    if (!char) return;
    setDialogue(char.message);
    setShowConfirm(false);
    setDialogueIndex(0);
  };

  const handleDialogueClick = () => {
    if (dialogueIndex < dialogue.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setCharacters(prev =>
        prev.map(c =>
          c.id === selectedId ? { ...c, talked: true } : c
        )
      );
      setDialogue([]);
      setSelectedId(null);

      const allTalked = characters.every(c =>
        c.id === selectedId ? true : c.talked
      );
      if (allTalked) {
        setShowEndButton(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {characters.map(char => (
          <div
            key={char.id}
            className={`${styles.characterCard} ${char.talked ? styles.talked : ''}`}
            onClick={() => handleSelect(char.id)}
          >
            <Image src={char.image} alt={char.name} width={100} height={150} />
            <div className={styles.name}>{char.name}</div>
          </div>
        ))}
      </div>

      {showConfirm && (
        <div className={styles.confirmBox}>
          <p>「{characters.find(c => c.id === selectedId)?.name}」と話しますか？</p>
          <button onClick={handleConfirm}>はい</button>
          <button onClick={() => setShowConfirm(false)}>いいえ</button>
        </div>
      )}

      {dialogue.length > 0 && (
        <div className={styles.dialogueBox} onClick={handleDialogueClick}>
          {dialogue[dialogueIndex]}
        </div>
      )}

      {showEndButton && (
        <div className={styles.endButtonWrapper}>
          <button className={styles.endButton} onClick={() => router.push('/day1')}>
            今日を終える
          </button>
        </div>
      )}
    </div>
  );
}
