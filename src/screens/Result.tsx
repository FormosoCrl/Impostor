import { ROLE_LABEL, type Game } from '../lib/game';
import { BannerAd } from '../components/ui';

export function Result({ game, onReplay, onSettings }: { game: Game; onReplay: () => void; onSettings: () => void }) {
  const civ = game.winner === 'civiles';
  return (
    <div className="screen">
      <div className={`result-hero ${civ ? 'good' : 'bad'}`}>
        <div className="result-emoji">{civ ? '🎉' : '😈'}</div>
        <h1>{civ ? '¡Ganan los civiles!' : '¡Ganan los impostores!'}</h1>
        <p>{game.winReason}</p>
      </div>
      <section className="card">
        <div className="card-head"><h3>La palabra era</h3><span className="pill">{game.categoryName}</span></div>
        <p className="word-big">{game.word}</p>
      </section>
      <section className="card">
        <h3>Roles</h3>
        <ul className="roles">
          {game.players.map((p, i) => (
            <li key={i} className={p.alive ? '' : 'out'}>
              <span>{p.name}</span>
              <span className={`role-tag ${p.role}`}>{ROLE_LABEL[p.role]}{p.role === 'despistado' ? ` · ${p.word}` : ''}</span>
            </li>
          ))}
        </ul>
      </section>
      <div className="sticky-cta">
        <button className="btn primary big" onClick={onReplay}>Otra partida</button>
        <button className="btn ghost" onClick={onSettings}>Cambiar jugadores o ajustes</button>
        <BannerAd />
      </div>
    </div>
  );
}
