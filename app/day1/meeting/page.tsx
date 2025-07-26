"use client";

import React, { useState } from "react";
import styles from "./MeetingScene.module.css";
import ParticipantGrid from "./components/ParticipantGrid";
import ConversationModal from "./components/ConversationModal";
import DeepConversation from "./components/DeepConversation";
import type { Participant } from "./components/ParticipantGrid";

export default function MeetingScene() {
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
  const [deepTalkParticipant, setDeepTalkParticipant] = useState<string | null>(null);
  const [deepConversationOpen, setDeepConversationOpen] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);

  const handleTalk = (id: string) => {
    setSelectedParticipant(id);
  };

  const handleConversationEnd = () => {
    setSelectedParticipant(null);
    setConversationEnded(true);
  };

  const handleDeepTalkTrigger = (id: string) => {
    setDeepTalkParticipant(id);
    setDeepConversationOpen(true);
  };

  const handleDeepTalkClose = () => {
    setDeepConversationOpen(false);
    setDeepTalkParticipant(null);
  };

  const participants: Participant[] = [
    {
      id: "suzuki",
      name: "鈴木導一",
      image: "/images/characters/suzuki.png",
      unlocked: true,
    },
    {
      id: "zero",
      name: "ゼロ",
      image: "/images/characters/zero.png",
      unlocked: true,
    },
    {
      id: "isoda",
      name: "磯田しの",
      image: "/images/characters/isoda.png",
      unlocked: true,
    },
    {
      id: "fuyuno",
      name: "冬野三太",
      image: "/images/characters/fuyuno.png",
      unlocked: true,
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>会議モード</h1>
      <ParticipantGrid
        participants={participants}
        onTalk={handleTalk}
        disabled={!!selectedParticipant || !!deepTalkParticipant}
      />

      {selectedParticipant && (
        <ConversationModal
          participantId={selectedParticipant}
          onClose={handleConversationEnd}
          onDeepTalk={() => handleDeepTalkTrigger(selectedParticipant)}
        />
      )}

      {deepTalkParticipant && (
        <DeepConversation
          participantId={deepTalkParticipant}
          onClose={handleDeepTalkClose}
          onFinish={handleDeepTalkClose} // ← これが重要
        />
      )}

      {conversationEnded && !deepTalkParticipant && (
        <div className={styles.replayBox}>
          <p>会話モードを再確認しますか？</p>
          <button onClick={() => alert("会話を再確認中...")}>会話モードを再生</button>
        </div>
      )}
    </div>
  );
}
