import { useEffect, useState } from 'react';
import type { Game } from '../lib/game';

export function Play({ game, timerSeconds, onVote, onQuit }: { game: Game; timerSeconds: number; onVote: () => void; onQuit: () => void }) {
  const n = game.players.length;
  const order = [...Array(n).keys()].map((k) => (game.starter + k) % n).filter((i) => game.players[i].alive);
  const [left, setLeft] = useState(timerSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => { setLeft(timerSeconds); setRunning(false); }, [game.round, timerSeconds]);
  useEffect(() => {
    if (!running || left <= 0) return;
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [running, left]);
  useEffect(() => {
    if (left === 0 && running) { setRunning(false); navigator.vibrate?.([200, 100, 200]); }
  }, [left, running]);

  const mm = Math.floor(left / 60), ss = String(left % 60).padStart(2, '0');

  return (
    <div className="screen">
      <header className="topbar">
        <button className="icon-btn" onClick={onQuit} aria-label="Salir">✕</button>
        <h2>Ronda {game.round}</h2>
        <span />
      </header>
      <div className="center">
        <p className="muted">Empieza</p>
        <h1 className="player-big">{game.players[game.starter].name}</h1>
        <p className="muted small">Decid una pista cada uno, en este orden:</p>
      </div>
      <ol className="order">
        {order.map((i, k) => (
          <li key={i}><span className="num">{k + 1}</span>{game.players[i].name}</li>
        ))}
      </ol>
      {timerSeconds > 0 && (
        <div className={`timer ${left === 0 ? 'done' : ''}`}>
          <span className="time">{left === 0 ? '¡Tiempo!' : `${mm}:${ss}`}</span>
          <div className="timer-btns">
            {left > 0 && <button className="btn small secondary" onClick={() => setRunning(!running)}>{running ? 'Pausa' : 'Debate'}</button>}
            <button className="btn small ghost" onClick={() => { setLeft(timerSeconds); setRunning(false); }}>Reiniciar</button>
          </div>
        </div>
      )}
      <div className="sticky-cta">
        <button className="btn primary big" onClick={onVote}>Votar 🗳️</button>
      </div>
    </div>
  );
}
