import { useEffect } from 'react';
import LegacySoccerApp from './components/LegacySoccerApp.jsx';

const legacyMarkup = "<div class=\"app\">\n<div class=\"topbar\">\n<div class=\"brand\">\n<div class=\"brand-row\">\n<h1>\u26bd Youth Soccer Formations or Systems of Play</h1>\n<span class=\"version\">003.053</span>\n</div>\n<div class=\"eyebrow\">Formation Select</div>\n<div class=\"selection-banner\">\n<span class=\"selection-badge\" id=\"headerFormatBadge\">7v7</span>\n<span class=\"selection-badge\" id=\"headerFormationBadge\">\u2014</span>\n<span class=\"selection-badge\" id=\"headerViewBadge\">Formations View</span>\n</div>\n</div>\n\n<div class=\"controls\">\n<div class=\"control-group\">\n<div class=\"control-title\">Formation Format</div>\n\n<div class=\"segmented\">\n<button class=\"segment-btn active\" id=\"btnFormat7v7\"\n        onclick=\"setFormat('7v7')\">7v7</button>\n\n<button class=\"segment-btn\" id=\"btnFormat9v9\"\n        onclick=\"setFormat('9v9')\">9v9</button>\n\n<button class=\"segment-btn\" id=\"btnFormat11v11\"\n        onclick=\"setFormat('11v11')\">11v11</button>\n</div>\n\n</div>\n\n<div class=\"control-group\">\n<div class=\"control-title\">View</div>\n<div class=\"segmented\">\n<button class=\"segment-btn active\" id=\"btnViewFormations\" onclick=\"setView('formations')\">Formations</button>\n<button class=\"segment-btn\" id=\"btnViewPlayer\" onclick=\"setView('player')\">\ud83d\udc64 Player</button>\n<button class=\"segment-btn\" id=\"btnViewCoach\" onclick=\"setView('coach')\">\ud83d\udccb Coach</button>\n</div>\n</div>\n</div>\n</div>\n\n<section id=\"screen-formations\" class=\"screen\">\n<div class=\"hero\">\n<h2>Choose Your Formation</h2>\n<p>Select a formation to see the Formation View, Player View, or Coach View tailored specifically for it.</p>\n</div>\n<div id=\"formationGrid\" class=\"formation-grid\"></div>\n</section>\n\n<section id=\"screen-player\" class=\"screen hidden\">\n<div class=\"view-shell\">\n<div class=\"view-header\">\n<div><h2 id=\"playerViewTitle\"></h2><p id=\"playerViewSubtitle\"></p></div>\n<button class=\"back-btn\" onclick=\"setView('formations')\">\u00e2\u2020\u0090 Back to Formations View</button>\n</div>\n<div class=\"view-content\" id=\"playerViewContent\"></div>\n</div>\n</section>\n\n<section id=\"screen-coach\" class=\"screen hidden\">\n<div class=\"view-shell\">\n<div class=\"view-header\">\n<div><h2 id=\"coachViewTitle\"></h2><p id=\"coachViewSubtitle\"></p></div>\n<button class=\"back-btn\" onclick=\"setView('formations')\">\u00e2\u2020\u0090 Back to Formations View</button>\n</div>\n<div class=\"view-content\" id=\"coachViewContent\"></div>\n</div>\n</section>\n</div>";

export default function App() {
  useEffect(() => {
    if (window.__soccerFormationsLegacyLoaded) return;
    window.__soccerFormationsLegacyLoaded = true;

    const script = document.createElement('script');
    script.src = '/legacy-app.js';
    script.async = false;
    document.body.appendChild(script);
  }, []);

  return <LegacySoccerApp markup={legacyMarkup} />;
}
