"use client";

import { characters } from "@/data/characters";
import NameTag from "@/components/ui/NameTag";

interface MessageBoxProps {
  speakerId: string;
  expression?: string;
  text: string;
  hasNext: boolean;
  onClick: () => void;
}

export default function MessageBox({
  speakerId,
  expression = "normal",
  text,
  hasNext,
  onClick,
}: MessageBoxProps) {
  const character = characters.find((c) => c.id === speakerId);
  const speakerName = character?.name || speakerId;

  return (
    <div
      className="absolute bottom-[5%] left-[5%] w-[90%] max-w-[960px] z-30 cursor-pointer"
      onClick={onClick}
    >
      {/* ネームタグ */}
      <div className="mb-1">
        <NameTag name={speakerName} />
      </div>

      {/* メッセージ本体 */}
      <div className="px-5 pt-4 pb-4 rounded-xl text-white text-[1.9rem] sm:text-[2.2rem] leading-[1.6] bg-[rgba(10,15,31,0.60)] backdrop-blur-[6px] shadow-lg overflow-y-auto transition-opacity duration-500">
        <div className="whitespace-pre-line break-words text-left min-h-[7rem] flex flex-col justify-start">
          {text}
        </div>
        {hasNext && (
          <div className="text-right text-yellow-300 text-[1.75rem] animate-pulse pr-2">
            ＞＞
          </div>
        )}
      </div>
    </div>
  );
}
