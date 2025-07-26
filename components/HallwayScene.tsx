// components/HallwayScene.tsx
"use client";

import { useState } from "react";
import { characters, Character } from "@/data/characters";
import "@/styles/HallwayScene.css";

export default function HallwayScene() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [talkedTo, setTalkedTo] = useState<string[]>([]);

  const handleCharacterClick = (char: Character) => {
    if (!talkedTo.includes(char.id)) {
      setSelectedCharacter(char);
    }
  };

  const handleConfirm = (yes: boolean) => {
    if (yes && selectedCharacter) {
      setTalkedTo([...talkedTo, selectedCharacter.id]);
      // 会話コンポーネントの呼び出しなど、後で追加予定
    }
    setSelectedCharacter(null);
  };

  return (
    <div className="hallway-scene">
      <img src="/bg_hallway.jpg" className="hallway-bg" alt="廊下背景" />

      <div className="character-row">
        {characters.map((char) => (
          <img
            key={char.id}
            src={char.expressions["normal"] || ""}
            alt={char.name}
            className={`character-icon ${talkedTo.includes(char.id) ? "dimmed" : ""}`}
            onClick={() => handleCharacterClick(char)}
          />
        ))}
      </div>

      {selectedCharacter && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <p>{selectedCharacter.name}に話しかけますか？</p>
            <div className="dialog-buttons">
              <button onClick={() => handleConfirm(true)}>はい</button>
              <button onClick={() => handleConfirm(false)}>いいえ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
