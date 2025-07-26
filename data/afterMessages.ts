// /data/afterMessages.ts

export type AfterMessage = {
  speakerId: string;
  text: string;
  expression?: string;
  bg?: string;
};

export const afterMessages: AfterMessage[] = [
  {
    speakerId: "narration",
    text: "……タイマーが止まった。\n爆弾は解除されたようだ。",
    bg: "/images/classroom_bg.png",
  },
  {
    speakerId: "koharu",
    expression: "think",
    text: "助かった……\nでも、まだ安心できない……",
  },
  {
    speakerId: "koharu",
    expression: "think",
    text: "たしか、ドアは開かなかったはず……",
  },
  {
    speakerId: "koharu",
    expression: "surprise",
    text: "鍵を探さないと……！",
  },
];
