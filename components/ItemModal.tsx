// components/ItemModal.tsx
import React from "react";
import styles from "./ItemModal.module.css";

type Item = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  items: Item[];
  onUse: (itemId: string) => void;
  onClose: () => void;
};

export default function ItemModal({ items, onUse, onClose }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modalBox}>
        <h2>持ち物</h2>
        <ul className={styles.itemList}>
          {items.map((item) => (
            <li key={item.id} className={styles.itemEntry}>
              <div>
                <strong>{item.name}</strong>
                <p>{item.description}</p>
              </div>
              <div className={styles.buttonRow}>
                <button onClick={() => onUse(item.id)}>使う</button>
                <button onClick={onClose}>使わない</button>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.footer}>
          <button onClick={onClose}>閉じる</button>
        </div>
      </div>
    </div>
  );
}
