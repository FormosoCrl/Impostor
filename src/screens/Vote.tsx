import { useState } from 'react';
import { ROLE_LABEL, type Game } from '../lib/game';

type Phase = { kind: 'pick' } | { kind: 'revealed'; idx: number } | { kind: 'guess'; idx: number };

export function Vote({ game, impostorsCanGuess, onEliminate, onContinue, onImpostorGuessed, onBack }: {
  game: Game;
  impostorsCanGuess: boolean;
  onEliminate: (idx: number) => void;
  onContinue: () => void;
  onImpostorGuessed: (idx: number) => void;
  onBack: () => void;
}) {
  const [sel, setSel] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>({ kind: 'pick' });

  if (phase.kind === 'pick') {
    return (
      <div className="screen">
        <header className="topbar">
          <button className="icon-btn" onClick={onBack} aria-label="Volver">←</button>
          <h2>¿A quién echáis?</h2>
          <span />
        </header>
        <p className="muted center-text">Debatid y elegid entre todos al más sospechoso.</p>
        <div className="vote-grid">
          {game.players.map((p, i) => p.alive && (
            <button key={i} className={`vote-btn ${sel === i ? 'on' : ''}`} onClick={() => setSel(i)}>
              <span className="avatar big">{p.name[0]?.toUpperCase()}</span>
              {p.name}
            </button>
          ))}
        </div>
        <div className="sticky-cta">
          <button className="btn danger big" disabled={sel === null} onClick={() => { onEliminate(sel!); setPhase({ kind: 'revealed', idx: sel! }); }}>
            {sel === null ? 'Elige a alguien' : `Eliminar a ${game.players[sel].name}`}
          </button>
        </div>
      </div>
    );
  }

  const p = game.players[phase.idx];
  const bad = p.role !== 'civil';

  if (phase.kind === 'guess') {
    return (
      <div className="screen center grow">
        <h2>Última oportunidad</h2>
        <p className="muted">{p.name}, di en voz alta cuál crees que es la palabra.</p>
        <p className="muted small">El resto: mirad la palabra solo cuando lo haya dicho.</p>
        <details className="peek">
          <summary>Ver la palabra</summary>
          <p className="word-big">{game.word}</p>
        </details>
        <div className="stack">
          <button className="btn primary" onClick={() => onImpostorGuessed(phase.idx)}>¡Acertó! Gana el impostor</button>
          <button className="btn secondary" onClick={onContinue}>Falló</button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen center grow">
      <div className={`verdict ${bad ? 'bad' : 'good'}`}>
        <p className="muted">{p.name} era…</p>
        <h1>{bad ? `¡${ROLE_LABEL[p.role].toUpperCase()}!` : 'Civil 😬'}</h1>
        {p.role === 'despistado' && <p className="muted small">Su palabra era «{p.word}»</p>}
      </div>
      {p.role === 'impostor' && impostorsCanGuess ? (
        <button className="btn primary big" onClick={() => setPhase({ kind: 'guess', idx: phase.idx })}>Que intente adivinar</button>
      ) : (
        <button className="btn primary big" onClick={onContinue}>Continuar</button>
      )}
    </div>
  );
}
