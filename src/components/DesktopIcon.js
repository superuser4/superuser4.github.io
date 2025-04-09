export default function DesktopIcon({ icon, label, onDoubleClick }) {
    return (
      <div className="desktop-icon" onDoubleClick={onDoubleClick}>
        <div className="icon-image">{icon}</div>
        <div className="icon-label">{label}</div>
      </div>
    );
}