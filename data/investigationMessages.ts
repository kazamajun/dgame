export type SpotId = "desk" | "bookshelf" | "door" | "speaker" | "podium";

export type CharacterExpression = "normal" | "surprise" | "think";

export type MessageEntry = {
  speakerId: string;
  expression?: CharacterExpression;
  text: string;
  bg?: string;
};

export const spotMessages: Record<SpotId, MessageEntry[]> = {
  desk: [
    {
      speakerId: "koharu",
      expression: "think",
      text: "机の中に。。。",
      bg: "/images/desk_bomb.png",
    },
    {
      speakerId: "koharu",
      expression: "surprise",
      text: "爆弾！？何とかしてタイマーを止めないと",
    },
  ],
  bookshelf: [
    {
      speakerId: "koharu",
      expression: "think",
      text: "本棚に何かないかな。。。",
      bg: "/images/bookshelf_note.png",
    },
    {
      speakerId: "koharu",
      expression: "think",
      text: "メモ用紙だ、紫のボタンを押せ",
    },
  ],
  door: [
    {
      speakerId: "koharu",
      expression: "think",
      text: "ガチャガチャ（ドアを開けようとする音）",
      bg: "/images/door_locked.png",
    },
    {
      speakerId: "koharu",
      expression: "surprise",
      text: "開かない！",
    },
    {
      speakerId: "koharu",
      expression: "think",
      text: "鍵がかかっている。。。",
    },
  ],
  speaker: [
    {
      speakerId: "koharu",
      expression: "think",
      text: "スピーカーが天井にある。",
      bg: "/images/speaker_close.png",
    },
    {
      speakerId: "koharu",
      expression: "think",
      text: "さっきの声の主だろうか。",
    },
  ],
  podium: [
    {
      speakerId: "koharu",
      expression: "think",
      text: "教卓の上には紙切れが……",
      bg: "/images/podium_hint.png",
    },
    {
      speakerId: "koharu",
      expression: "think",
      text: "何かのヒントかもしれない。",
    },
  ],
};
