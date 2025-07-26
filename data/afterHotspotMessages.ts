// /data/afterHotspotMessages.ts

export type AfterSpotId = "desk" | "door" | "floor";

export type AfterSpotResponse = {
  speakerId: string;
  expression?: string;
  text: string;
};

type SpotLogicFunction = (
  alreadyChecked: boolean,
  pencilFound: boolean
) => {
  messages: AfterSpotResponse[];
  foundPencil?: boolean;
};

export const afterSpotMessages: Record<AfterSpotId, SpotLogicFunction> = {
  desk: () => ({
    messages: [
      {
        speakerId: "koharu",
        expression: "think",
        text: "教卓の上にメモ用紙がある……よく見ると何か書きあとが残ってる。",
      },
    ],
  }),
  door: () => ({
    messages: [
      {
        speakerId: "koharu",
        expression: "think",
        text: "電子的な鍵がかかってる……生体認証？カードキー？",
      },
    ],
  }),
  floor: (alreadyChecked: boolean, _pencilFound: boolean) => {
    if (alreadyChecked) {
      return {
        messages: [
          {
            speakerId: "koharu",
            expression: "think",
            text: "さっきの場所にはもう何もなさそう……",
          },
        ],
      };
    } else {
      return {
        messages: [
          {
            speakerId: "koharu",
            expression: "think",
            text: "ん？床に何か……えんぴつだ！",
          },
        ],
        foundPencil: true,
      };
    }
  },
};
