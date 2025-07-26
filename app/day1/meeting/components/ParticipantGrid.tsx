"use client";

import React from "react";
import styles from "../MeetingScene.module.css";
import CharacterIcon from "@/components/CharacterIcon";

export type Participant = {
  id: string;
  name: string;
  image: string;
  unlocked: boolean;
};

type Props = {
  participants: Participant[];
  onTalk: (id: string) => void;
  disabled: boolean;
};

export default function ParticipantGrid({ participants, onTalk, disabled }: Props) {
  return (
    <div className={styles.gridBox}>
      {participants.map((p) => (
        <div
          key={p.id}
          className={styles.participantCard}
          onClick={() => !disabled && onTalk(p.id)}
          style={{ opacity: p.unlocked ? 1 : 0.3 }}
        >
          <CharacterIcon src={p.image} alt={p.name} />
          <div className={styles.nameLabel}>{p.name}</div>
        </div>
      ))}
    </div>
  );
}
