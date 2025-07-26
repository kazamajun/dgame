export type Participant = {
  id: string;
  name: string;
  displayName: string;
  canTalk: boolean;
};

export const participants: Participant[] = [
  { id: "suzuki", name: "鈴木導一", displayName: "怪しげな教師風の男", canTalk: true },
  { id: "zero", name: "ゼロ", displayName: "炭酸飲料を持つ男", canTalk: true },
  { id: "isoda", name: "磯田しの", displayName: "人気インフルエンサー風", canTalk: true },
  { id: "fuyuno", name: "冬野三太", displayName: "派手なユーチューバー", canTalk: true },
  { id: "gobancho", name: "五番町の母", displayName: "占い師っぽい中年女性", canTalk: false },
  { id: "mutsuo", name: "隙間むつお", displayName: "ポエマー風の男", canTalk: false },
  { id: "gouzan", name: "剛山源二", displayName: "強面の親方風", canTalk: false },
  { id: "shino", name: "星野こはる", displayName: "プレイヤー", canTalk: false },
];
