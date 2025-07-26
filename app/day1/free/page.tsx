'use client';

import React, { useState, useEffect } from 'react';
import styles from './FreeScene.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Character = {
  id: string;
  name: string;
  image: string;
  location: 'hallway' | 'cafeteria' | 'gym';
  message: string[];
  talked: boolean;
};

const initialCharacters: Character[] = [
  {
    id: 'shino',
    name: '磯田しの',
    image: '/images/shino.png',
    location: 'hallway',
    message: ['昨日のAIの話……正直、ビビってる。', 'でも負けない。見抜いてみせる。'],
    talked: false,
  },
  {
    id: 'gobanchou',
    name: '五番町の母',
    image: '/images/gobanchou.png',
    location: 'hallway',
    message: ['宝くじは当たるか外れるか、二分の一よ。', 'この状況も、案外似てるかもしれないわね……。'],
    talked: false,
  },
  {
    id: 'zero',
    name: 'ゼロ',
    image: '/images/zero.png',
    location: 'cafeteria',
    message: ['AIか……ワクワクするな。', 'ま、炭酸ゼロでも飲みながら考えるか。'],
    talked: false,
  },
  {
    id: 'kou',
    name: '千日コウ',
    image: '/images/kou_normal.png',
    location: 'cafeteria',
    message: ['ゲームとはいえ、分析が物を言いますわ。', '情報は、早めに集めておくのが吉ですわね。'],
    talked: false,
  },
  {
    id: 'suzuki',
    name: '鈴木導一',
    image: '/images/suzuki.png',
    location: 'gym',
    message: ['教育と推理は似ている。', '根拠を持って、仮説を立てることが大事だ。'],
    talked: false,
  },
  {
    id: 'santa',
    name: '冬野三太',
    image: '/images/santa.png',
    location: 'gym',
    message: ['俺、見た目で疑われそうで怖いんだよね……', 'でも本気で生き残るつもりだよ。'],
    talked: false,
  },
];

export default function FreeScene() {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dialogue, setDialogue] = useState<string[]>([]);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [location, setLocation] = useState<'hallway' | 'cafeteria' | 'gym' | 'room'>('hallway');
  const [showProceed, setShowProceed] = useState(false);
  const [inventory, setInventory] = useState<string[]>([]);
  const router = useRouter();

  // アイテム獲得処理（場所ごとに1回のみ）
  useEffect(() => {
    if (location === 'hallway' && !inventory.includes('カセットテープ')) {
      alert('足元にカセットテープが落ちていた。拾った。');
      setInventory(prev => [...prev, 'カセットテープ']);
    }
    if (location === 'cafeteria' && !inventory.includes('炭酸ゼロ')) {
      alert('「炭酸ゼロ」の缶が置かれていた。手に取った。');
      setInventory(prev => [...prev, '炭酸ゼロ']);
    }
  }, [location]);

  const handleSelect = (id: string) => {
    const char = characters.find(c => c.id === id);
    if (!char || char.talked) return;
    setSelectedId(id);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    const char = characters.find(c => c.id === selectedId);
    if (!char) return;
    setDialogue(char.message);
    setShowConfirm(false);
    setDialogueIndex(0);
  };

  const handleDialogue = () => {
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
        setShowProceed(true);
      }
    }
  };

  const visibleCharacters = characters.filter(c => c.location === location);

  return (
    <div className={styles.container}>
      {/* アイテム所持リスト */}
      <div className={styles.inventoryBox}>
        <strong>持ち物:</strong>
        <ul>
          {inventory.length === 0 ? (
            <li>なし</li>
          ) : (
            inventory.map((item, i) => <li key={i}>{item}</li>)
          )}
        </ul>
      </div>

      {/* 移動ボタン */}
      <div className={styles.locationButtons}>
        <button onClick={() => setLocation('hallway')}>廊下</button>
        <button onClick={() => setLocation('cafeteria')}>朝食会場</button>
        <button onClick={() => setLocation('gym')}>体育館</button>
        <button onClick={() => alert('セーブしました！')}>自室（セーブ）</button>
      </div>

      {/* キャラ一覧 */}
      <div className={styles.grid}>
        {visibleCharacters.map(char => (
          <div
            key={char.id}
            className={`${styles.card} ${char.talked ? styles.talked : ''}`}
            onClick={() => handleSelect(char.id)}
          >
            <Image src={char.image} alt={char.name} width={100} height={150} />
            <div className={styles.name}>{char.name}</div>
          </div>
        ))}
      </div>

      {/* 会話確認 */}
      {showConfirm && (
        <div className={styles.confirmBox}>
          <p>「{characters.find(c => c.id === selectedId)?.name}」と話しますか？</p>
          <button onClick={handleConfirm}>はい</button>
          <button onClick={() => setShowConfirm(false)}>いいえ</button>
        </div>
      )}

      {/* セリフ表示 */}
      {dialogue.length > 0 && (
        <div className={styles.dialogueBox} onClick={handleDialogue}>
          {dialogue[dialogueIndex]}
        </div>
      )}

      {/* 会議ボタン */}
      {showProceed && (
        <div className={styles.proceedWrapper}>
          <button className={styles.proceedButton} onClick={() => router.push('/day1/meeting')}>
            会議へ進む
          </button>
        </div>
      )}
    </div>
  );
}
