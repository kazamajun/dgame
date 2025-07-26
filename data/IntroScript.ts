export type IntroMessage = {
  speakerId: string;
  expression?: string;
  text: string;
  bg?: string;
};

export const messages: IntroMessage[] = [
  {
    speakerId: "koharu",
    expression: "surprise",
    text: "……うん？\n……",
    bg: "/images/black.png",
  },
  {
    speakerId: "koharu",
    expression: "surprise",
    text: "頭がガンガンする……。\nここは……どこ……？",
    bg: "/images/black.png",
  },
  {
    speakerId: "koharu",
    expression: "think",
    text: "意識は戻ったけど……\n何も思い出せない……。",
    bg: "/images/black2.png",
  },
  {
    speakerId: "koharu",
    expression: "think",
    text: "ここ……教室？\n知らない場所……。",
    bg: "/images/black2.png",
  },
  {
    speakerId: "koharu",
    expression: "think",
    text: "目を開けると、\n知らない教室にいた。",
    bg: "/images/classroom_bg.png",
  },
  {
    speakerId: "gm",
    text: "──お目覚めですね。\n星野こはるさん。",
    bg: "/images/classroom_bg.png",
  },
  {
    speakerId: "gm",
    text: "落ち着いてきいてください。\nこれからあなたには、脱出ゲームをしていただきます。",
    bg: "/images/classroom_bg.png",
  },
  {
    speakerId: "gm",
    text: "この教室は、三分後に\n爆破されます。",
    bg: "/images/classroom_bg.png",
  },
  {
    speakerId: "koharu",
    expression: "surprise",
    text: "えっ……爆破！？\nちょっと、冗談でしょ……！？",
    bg: "/images/classroom_bg.png",
  },
  {
    speakerId: "gm",
    text: "安心してください。\n隣の部屋へ移動すれば、回避可能です。",
    bg: "/images/classroom_bg.png",
  },
  {
    speakerId: "gm",
    text: "それでは、\nタイマーを開始します。\n──ザー……プツン……",
    bg: "/images/classroom_bg.png",
  },
  {
    speakerId: "koharu",
    expression: "think",
    text: "三分で爆発って……\n意味わかんない……！",
    bg: "/images/classroom_bg.png",
  },
  {
    speakerId: "koharu",
    expression: "surprise",
    text: "でも……\n止まってたらマジでやばい……！",
    bg: "/images/classroom_bg.png",
  },
  {
    speakerId: "koharu",
    expression: "normal",
    text: "とにかく……\n動かなきゃ！！",
    bg: "/images/classroom_bg.png",
  },
];
