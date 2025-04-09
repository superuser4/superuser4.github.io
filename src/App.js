import { useState } from 'react';
import './App.css';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import { items } from './data/items';

export default function App() {
  const [openWindows, setOpenWindows] = useState([]);

  const openWindow = (item) => {
    if (!openWindows.find(w => w.id === item.id)) {
      setOpenWindows([...openWindows, {
        ...item,
        onClose: () => setOpenWindows(openWindows.filter(w => w.id !== item.id))
      }]);
    }
  };

  return (
    <div className="desktop">
      {/* Desktop Icons */}
      <div className="icons">
        {items.map(item => (
          <DesktopIcon
            key={item.id}
            icon={item.icon}
            label={item.title}
            onDoubleClick={() => openWindow(item)}
          />
        ))}
      </div>

      {/* Open Windows */}
      {openWindows.map(window => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          content={window.content}
          onClose={window.onClose}
        />
      ))}

      {/* Taskbar */}
      <div className="taskbar">
        <div className="start-button">🪟 Start</div>
        <div className="taskbar-items"></div>
        <div className="clock">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
    </div>
  );
}