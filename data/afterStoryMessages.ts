// /data/afterStoryMessages.ts

import { AfterMessage } from "./afterMessages";

export const afterStoryMessages: AfterMessage[] = [
  {
    speakerId: "koharu",
    expression: "think",
    text: "メモ用紙とえんぴつ……これで書きあとを浮かび上がらせられるかも！",
    bg: "/images/classroom_bg.png",
  },
  {
    speakerId: "narration",
    text: "こはるは、えんぴつでメモ用紙をなぞった……",
    bg: "/images/memo_reveal.png",
  },
  {
    speakerId: "koharu",
    expression: "surprise",
    text: "『鍵は生徒手帳』って書いてある！？",
  },
  {
    speakerId: "narration",
    text: "こはるは制服のポケットから生徒手帳を取り出し、ドアにかざした……",
    bg: "/images/door_unlock.png",
  },
  {
    speakerId: "koharu",
    expression: "normal",
    text: "よし、開いた！外に出よう！",
    bg: "/images/classroom_bg.png",
  },
];
