"use client";

import { characters } from "@/data/characters";

interface CharacterSpriteProps {
  speakerId: string;
  expression?: string;
}

export default function CharacterSprite({
  speakerId,
  expression = "normal",
}: CharacterSpriteProps) {
  const character = characters.find((c) => c.id === speakerId);

  // キャラクターが見つからない or 表情定義がない場合は非表示（例：ナレーション）
  if (!character || !character.expressions || Object.keys(character.expressions).length === 0) {
    return null;
  }

  const image = character.expressions[expression] || character.expressions["normal"];
  if (!image) return null;

  return (
    <img
      src={image}
      alt={character.name || "キャラクター"}
      className="absolute bottom-[25vh] left-1/2 transform -translate-x-1/2 z-10 max-h-[60vh]"
    />
  );
}
