// /lib/save.ts（2スロット対応）

export type SaveSlotId = 1 | 2;

export type SaveData = {
  checkpoint: string; // 例: "after"
  phase?: string;     // optional: "investigation", "story"など
  bg: string;
  timestamp: number;
};

const SAVE_PREFIX = "dgame_save_slot_";

export function saveToSlot(slotId: SaveSlotId, data: SaveData) {
  const key = `${SAVE_PREFIX}${slotId}`;
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromSlot(slotId: SaveSlotId): SaveData | null {
  const key = `${SAVE_PREFIX}${slotId}`;
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as SaveData;
  } catch {
    return null;
  }
}

export function clearSlot(slotId: SaveSlotId) {
  const key = `${SAVE_PREFIX}${slotId}`;
  localStorage.removeItem(key);
}

export function listAllSaves(): { slot: SaveSlotId; data: SaveData | null }[] {
  return [1, 2].map((slot) => ({
    slot: slot as SaveSlotId,
    data: loadFromSlot(slot as SaveSlotId),
  }));
}
