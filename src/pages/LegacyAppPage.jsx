import { useEffect } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

const legacyMarkup = `
<div class="app">
  <div class="topbar">
    <div class="brand">
      <div class="brand-row">
        <h1>⚽ Youth Soccer Formations or Systems of Play</h1>
        <span class="version">003.053</span>
      </div>
      <div class="eyebrow">Formation Select</div>
      <div class="selection-banner">
        <span class="selection-badge" id="headerFormatBadge">7v7</span>
        <span class="selection-badge" id="headerFormationBadge">—</span>
        <span class="selection-badge" id="headerViewBadge">Formations View</span>
      </div>
    </div>

    <div class="controls">
      <div class="control-group">
        <div class="control-title">Formation Format</div>
        <div class="segmented">
          <button class="segment-btn active" id="btnFormat7v7" onclick="setFormat('7v7')">7v7</button>
          <button class="segment-btn" id="btnFormat9v9" onclick="setFormat('9v9')">9v9</button>
          <button class="segment-btn" id="btnFormat11v11" onclick="setFormat('11v11')">11v11</button>
        </div>
      </div>

      <div class="control-group">
        <div class="control-title">View</div>
        <div class="segmented">
          <button class="segment-btn active" id="btnViewFormations" onclick="setView('formations')">Formations</button>
          <button class="segment-btn" id="btnViewPlayer" onclick="setView('player')">👤 Player</button>
          <button class="segment-btn" id="btnViewCoach" onclick="setView('coach')">📋 Coach</button>
        </div>
      </div>
    </div>
  </div>

  <section id="screen-formations" class="screen">
    <div class="hero">
      <h2>Choose Your Formation</h2>
      <p>Select a formation to see the Formation View, Player View, or Coach View tailored specifically for it.</p>
    </div>
    <div id="formationGrid" class="formation-grid"></div>
  </section>

  <section id="screen-player" class="screen hidden">
    <div class="view-shell">
      <div class="view-header">
        <div>
          <h2 id="playerViewTitle"></h2>
          <p id="playerViewSubtitle"></p>
        </div>
        <button class="back-btn" onclick="setView('formations')">← Back to Formations View</button>
      </div>
      <div class="view-content" id="playerViewContent"></div>
    </div>
  </section>

  <section id="screen-coach" class="screen hidden">
    <div class="view-shell">
      <div class="view-header">
        <div>
          <h2 id="coachViewTitle"></h2>
          <p id="coachViewSubtitle"></p>
        </div>
        <button class="back-btn" onclick="setView('formations')">← Back to Formations View</button>
      </div>
      <div class="view-content" id="coachViewContent"></div>
    </div>
  </section>
</div>
`;

export default function LegacyAppPage() {
  const { logout, user } = useAuth();

  useEffect(() => {
    if (window.__soccerLegacyLoaded) return;
    window.__soccerLegacyLoaded = true;

    const script = document.createElement('script');
    script.src = '/legacy-app.js';
    script.async = false;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div className="auth-topbar">
        <span>{user?.email}</span>
        <button onClick={logout}>Log Out</button>
      </div>

      <div dangerouslySetInnerHTML={{ __html: legacyMarkup }} />
    </>
  );
}
`