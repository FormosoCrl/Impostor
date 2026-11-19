import { useState } from 'react';
import type { Game } from '../lib/game';

export function Reveal({ game, onDone, onQuit }: { game: Game; onDone: () => void; onQuit: () => void }) {
  const [idx, setIdx] = useState(0);
  const [stage, setStage] = useState<'pass' | 'card'>('pass');
  const [holding, setHolding] = useState(false);
  const [seen, setSeen] = useState(false);
  const p = game.players[idx];
  const last = idx === game.players.length - 1;

  const next = () => {
    if (last) return onDone();
    setIdx(idx + 1); setStage('pass'); setSeen(false); setHolding(false);
  };

  const start = () => { setHolding(true); setSeen(true); };
  const end = () => setHolding(false);

  return (
    <div className="screen reveal">
      <header className="topbar">
        <button className="icon-btn" onClick={onQuit} aria-label="Salir">✕</button>
        <span className="progress">{idx + 1} / {game.players.length}</span>
        <span />
      </header>

      {stage === 'pass' ? (
        <div className="center grow">
          <p className="muted">Pasa el móvil a</p>
          <h1 className="player-big">{p.name}</h1>
          <p className="muted small">Que nadie más mire la pantalla 👀</p>
          <button className="btn primary big" onClick={() => setStage('card')}>Soy {p.name}</button>
        </div>
      ) : (
        <div className="center grow">
          <div
            className={`secret-card ${holding ? 'flipped' : ''}`}
            onPointerDown={start} onPointerUp={end} onPointerLeave={end} onPointerCancel={end}
            onContextMenu={(e) => e.preventDefault()}
            role="button" aria-label="Mantén pulsado para ver tu carta"
          >
            <div className="face front">
              <div className="card-emoji">🂠</div>
              <p>Mantén pulsado<br />para ver tu carta</p>
            </div>
            <div className={`face back ${p.role === 'impostor' ? 'imp' : ''}`}>
              {p.role === 'impostor' ? (
                <>
                  <p className="label">Eres el</p>
                  <h2 className="role-big">IMPOSTOR</h2>
                  {p.hint ? <p className="hint">Pista: <b>{p.hint}</b></p> : <p className="hint">Sin pista. ¡Improvisa!</p>}
                  {game.players.filter((x) => x.role === 'impostor').length > 1 && (
                    <p className="hint small">Hay más de un impostor</p>
                  )}
                </>
              ) : (
                <>
                  <p className="label">Tu palabra es</p>
                  <h2 className="word-big">{p.word}</h2>
                </>
              )}
            </div>
          </div>
          <button className="btn primary big" disabled={!seen || holding} onClick={next}>
            {last ? '¡Empezar!' : 'Hecho, pasar el móvil'}
          </button>
        </div>
      )}
    </div>
  );
}
