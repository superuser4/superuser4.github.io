import { useState } from 'react';

export default function Window({ id, title, content, onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="window" style={{ zIndex: 1000 + id }}>
      <div className="title-bar">
        <span className="title">{title}</span>
        <div className="window-controls">
          <button onClick={() => setIsMinimized(!isMinimized)}>─</button>
          <button onClick={onClose}>✕</button>
        </div>
      </div>
      {!isMinimized && <div className="window-content">{content}</div>}
    </div>
  );
}