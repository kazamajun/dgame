'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './GymScene.module.css';
import { useRouter } from 'next/navigation';

type Message = {
  speaker: string;
  image: string;
  text: string;
};

// 会話データ（前ステップで作成した配列を省略してimportする形でも可）
const messages: Message[] = [
  {
    speaker: "星野こはる",
    image: "/images/koharu_normal.png",
    text: "ここ……体育館……だよね？\n何か、空気が違う……"
  },
  {
    speaker: "千日コウ",
    image: "/images/kou_normal.png",
    text: "ええ。設備は一般的ですが、\n妙に張り詰めておりますわ。"
  },
  {
    speaker: "星野こはる",
    image: "/images/koharu_normal.png",
    text: "あの人……あれって、ブランド物？\nなんか、セレブっぽい……"
  },
  {
    speaker: "千日コウ",
    image: "/images/kou_normal.png",
    text: "参加者は年齢も経歴も、\nかなりバラバラのようですわね。"
  },
  {
    speaker: "若い男性",
    image: "/images/youngman_angry.png",
    text: "おい、誰も出てこねぇのか？\n時間のムダだろ、こんなの──"
  },
  {
    speaker: "システム",
    image: "",
    text: "（突然、照明がすべて消える）"
  },
  {
    speaker: "アトラス",
    image: "/images/atlas.png",
    text: "ようこそ、参加者の皆さま。"
  },
  {
    speaker: "千日コウ",
    image: "/images/kou_normal.png",
    text: "……現代の技術とは思えませんわね。"
  },
  {
    speaker: "アトラス",
    image: "/images/atlas.png",
    text: "ご挨拶が遅れました。\n私はこの空間の管理AI──アトラス。"
  },
  {
    speaker: "若い男性",
    image: "/images/youngman_angry.png",
    text: "てめぇ、人間かよ？\nなんだその出方は……"
  },
  {
    speaker: "アトラス",
    image: "/images/atlas.png",
    text: "ふふっ。良い質問ですね。\nただ、それを本物の“人”に向けて言うと、\n少し無礼かもしれませんよ？"
  },
  {
    speaker: "星野こはる（心の声）",
    image: "/images/koharu_normal.png",
    text: "……確かに。\nその通りかもしれない……"
  },
  {
    speaker: "アトラス",
    image: "/images/atlas.png",
    text: "さて、本題に入りましょう。"
  },
  {
    speaker: "アトラス",
    image: "/images/atlas.png",
    text: "この体育館には現在、あなた方を含め\n計９名が参加しています。"
  },
  {
    speaker: "アトラス",
    image: "/images/atlas.png",
    text: "ですが、明日以降、毎日一人ずつ\nAIに“入れ替わって”いただきます。"
  },
  {
    speaker: "星野こはる",
    image: "/images/koharu_surprised.png",
    text: "……えっ、入れ替わる……？"
  },
  {
    speaker: "アトラス",
    image: "/images/atlas.png",
    text: "見た目も話し方も、人格すらも、\n完全に人間そっくりなAIへ。"
  },
  {
    speaker: "アトラス",
    image: "/images/atlas.png",
    text: "あなた方の役割は、\nそのAIが誰かを投票で見抜くことです。"
  },
  {
    speaker: "アトラス",
    image: "/images/atlas.png",
    text: "投票は毎日1回。  \n最多票を得た方には──脱落していただきます。"
  },
  {
    speaker: "セレブ風の女性",
    image: "/images/celebrity.png",
    text: "ちょっと待って……\n脱落って、どういう意味よ？"
  },
  {
    speaker: "アトラス",
    image: "/images/atlas.png",
    text: "誤ってAIと疑われた方には、\nその時点で3億円の債務を\n負っていただきます。"
  },
  {
    speaker: "若い男性",
    image: "/images/youngman_angry.png",
    text: "は？ 金！？\n冗談じゃねえだろ……"
  },
  {
    speaker: "アトラス",
    image: "/images/atlas.png",
    text: "ご安心を。\nAIを見抜ければ全員ノーペナルティですから。"
  },
  {
    speaker: "アトラス",
    image: "/images/atlas.png",
    text: "なお、ゲームは明日より開始。\n本日は自由行動といたします。"
  },
  {
    speaker: "アトラス",
    image: "/images/atlas.png",
    text: "細かいルールやご質問があれば、\n随時お尋ねください。"
  },
  {
    speaker: "アトラス",
    image: "/images/atlas.png",
    text: "……お答えできる範囲で、ですが。"
  },
  {
    speaker: "アトラス",
    image: "/images/atlas.png",
    text: "それでは──皆さまの健闘を、\n心よりお祈りいたします。"
  },
  {
    speaker: "システム",
    image: "",
    text: "（アトラスが光に包まれて消える）"
  }
];


export default function GymPage() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const current = messages[index];

  const handleClick = () => {
    if (index < messages.length - 1) {
      setIndex(index + 1);
    } else {
      // 全てのメッセージが終わったら次のシーンへ遷移
      router.push('/gym/after');
    }
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      {/* 背景画像 */}
      <div className={styles.background} />

      {/* キャラクター画像 */}
      {current.image && (
        <Image
          src={current.image}
          alt={current.speaker}
          width={300}
          height={400}
          className={styles.character}
        />
      )}

      {/* メッセージウィンドウ */}
      <div className={styles.messageBox}>
        <div className={styles.nameLabel}>{current.speaker}</div>
        {current.text.split('\n').map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}
