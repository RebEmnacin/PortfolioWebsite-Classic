import { FolderIco } from "./icons/Icons";

/* ─────────────────────────────────────────────────────────────────
   PROJECTS (inline trigger)
   This is just the little folder button on the main scrolling page.
   The actual project list lives in the full-screen overlay that
   App.jsx renders when this button is clicked (see App.jsx).
───────────────────────────────────────────────────────────────── */
export function ProjectsSection({ onOpen, folderBtnRef }) {
  return (
    <div className="folder-stage">
      <button ref={folderBtnRef} className="folder-btn" onClick={onOpen}>
        <span className="folder-ico-wrap"><FolderIco s={40}/></span>
        <span className="folder-label">Open Projects</span>
      </button>
    </div>
  );
}
