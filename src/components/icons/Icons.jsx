/* ─────────────────────────────────────────────────────────────────
   SVG ICONS
   All small icon components used across the site live here so any
   component can `import { HomeIco, MailIco, ... } from "./icons/Icons"`
───────────────────────────────────────────────────────────────── */

export const Icon = ({ d, size = 20, fill = "none", sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

export const HomeIco    = ({ s=20 }) => <Icon size={s} d={<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>} />;
export const UserIco    = ({ s=20 }) => <Icon size={s} d={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>} />;
export const MonitorIco = ({ s=20 }) => <Icon size={s} d={<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>} />;
export const StarIco    = ({ s=20 }) => <Icon size={s} d={<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>} />;
export const MailIco    = ({ s=20 }) => <Icon size={s} d={<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>} />;
export const GhIco      = ({ s=18 }) => <Icon size={s} d={<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>} />;
export const LiIco      = ({ s=18 }) => <Icon size={s} d={<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>} />;
export const TgIco      = ({ s=18 }) => <Icon size={s} d={<path d="M22 2L2 9.5l7 2.5m13-10L15.5 19l-4.5-7.5m11-9.5l-13 9.5"/>} />;
export const ArrowIco   = ({ s=14 }) => <Icon size={s} d={<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>} />;
export const ExtIco     = ({ s=12 }) => <Icon size={s} d={<><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>} />;
export const BackIco    = ({ s=16 }) => <Icon size={s} d={<><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>} />;
export const CheckIco   = ({ s=14 }) => <Icon size={s} d={<polyline points="20 6 9 17 4 12"/>} />;
export const ZapIco     = ({ s=16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
export const XIco       = ({ s=20 }) => <Icon size={s} d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} />;
export const MenuIco    = ({ s=20 }) => <Icon size={s} d={<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>} />;
export const FolderIco  = ({ s=48 }) => <Icon size={s} sw={1.5} d={<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>} />;
export const DbIco      = ({ s=22 }) => <Icon size={s} d={<><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>} />;

export const CloudIco   = ({ s=22 }) => <Icon size={s} d={<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>} />;
export const BotIco     = ({ s=22 }) => <Icon size={s} d={<><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M12 11V3"/><circle cx="12" cy="3" r="1"/><line x1="8" y1="15" x2="8" y2="17"/><line x1="16" y1="15" x2="16" y2="17"/><path d="M7 11V8a5 5 0 0 1 10 0v3"/></>} />;
export const BreadIco   = ({ s=24 }) => <Icon size={s} d={<path d="M3 11c0-3.87 4.03-7 9-7s9 3.13 9 7c0 2.21-1.3 4.19-3.36 5.54L17 21H7l-.64-4.46C4.3 15.19 3 13.21 3 11z"/>} />;
export const GlobeIco   = ({ s=24 }) => <Icon size={s} d={<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>} />;
export const BarIco     = ({ s=22 }) => <Icon size={s} d={<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></>} />;
export const PlusIco    = ({ s=20 }) => <Icon size={s} d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} />;
export const SunIco     = ({ s=20 }) => <Icon size={s} d={<><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/></>} />;
export const MoonIco    = ({ s=20 }) => <Icon size={s} d={<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>} />;