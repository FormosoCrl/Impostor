import { useState } from 'react';
import { CATEGORIES, CUSTOM_CATEGORY_ID } from '../data/words';
import { maxImpostors, type Settings } from '../lib/game';
import { BannerAd, Segmented, Stepper, Toggle } from '../components/ui';

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 20;

export function Setup({ settings, onChange, onStart, onBack }: {
  settings: Settings; onChange: (s: Settings) => void; onStart: () => void; onBack: () => void;
}) {
  const [newName, setNewName] = useState('');
  const s = settings;
  const set = (patch: Partial<Settings>) => {
    const next = { ...s, ...patch };
    next.impostors = Math.min(next.impostors, maxImpostors(next.players.length, next.despistado));
    onChange(next);
  };

  const addPlayer = () => {
    const name = newName.trim() || `Jugador ${s.players.length + 1}`;
    if (s.players.length >= MAX_PLAYERS) return;
    set({ players: [...s.players, uniqueName(name, s.players)] });
    setNewName('');
  };

  const toggleCat = (id: string) => {
    const has = s.categories.includes(id);
    set({ categories: has ? s.categories.filter((c) => c !== id) : [...s.categories, id] });
  };

  const customOn = s.categories.includes(CUSTOM_CATEGORY_ID);
  const customCount = s.customWords.filter((w) => w.trim()).length;
  const names = s.players.map((p) => p.trim().toLowerCase());
  const dupes = names.some((n, i) => names.indexOf(n) !== i);
  const empties = s.players.some((p) => !p.trim());
  const noCats = s.categories.length === 0 || (s.categories.length === 1 && customOn && customCount < 2);
  const error =
    s.players.length < MIN_PLAYERS ? `Hacen falta al menos ${MIN_PLAYERS} jugadores.` :
    empties ? 'Hay un jugador sin nombre.' :
    dupes ? 'Hay nombres repetidos.' :
    noCats ? 'Elige al menos una categoría (o escribe 2 palabras propias).' : '';

  const maxImp = maxImpostors(s.players.length, s.despistado);

  return (
    <div className="screen">
      <header className="topbar">
        <button className="icon-btn" onClick={onBack} aria-label="Volver">←</button>
        <h2>Nueva partida</h2>
        <span />
      </header>

      <section className="card">
        <div className="card-head"><h3>Jugadores</h3><span className="pill">{s.players.length}</span></div>
        <ul className="players">
          {s.players.map((p, i) => (
            <li key={i}>
              <span className="avatar">{(p.trim()[0] || '?').toUpperCase()}</span>
              <input value={p} maxLength={18} aria-label={`Nombre del jugador ${i + 1}`}
                onChange={(e) => set({ players: s.players.map((x, j) => (j === i ? e.target.value : x)) })} />
              <button className="icon-btn danger" aria-label={`Quitar a ${p}`} disabled={s.players.length <= MIN_PLAYERS}
                onClick={() => set({ players: s.players.filter((_, j) => j !== i) })}>✕</button>
            </li>
          ))}
        </ul>
        {s.players.length < MAX_PLAYERS && (
          <form className="add-player" onSubmit={(e) => { e.preventDefault(); addPlayer(); }}>
            <input value={newName} maxLength={18} placeholder="Nombre del jugador" onChange={(e) => setNewName(e.target.value)} />
            <button className="btn small primary" type="submit">Añadir</button>
          </form>
        )}
      </section>

      <section className="card">
        <h3>Roles</h3>
        <div className="row">
          <span className="row-text"><span className="row-label">Impostores</span><span className="row-desc">Máximo {maxImp} con {s.players.length} jugadores</span></span>
          <Stepper value={s.impostors} min={1} max={maxImp} onChange={(v) => set({ impostors: v })} />
        </div>
        <Toggle label="Despistado" desc="Recibe una palabra parecida y no sabe que es distinta" value={s.despistado}
          onChange={(v) => set({ despistado: v })} />
        <div className="row column">
          <span className="row-label">Pista para el impostor</span>
          <Segmented value={s.hint} onChange={(v) => set({ hint: v })}
            options={[{ value: 'none', label: 'Ninguna' }, { value: 'category', label: 'Categoría' }, { value: 'word', label: 'Palabra' }]} />
        </div>
        <Toggle label="Última oportunidad" desc="Si pillan al impostor, puede ganar adivinando la palabra" value={s.impostorsCanGuess}
          onChange={(v) => set({ impostorsCanGuess: v })} />
      </section>

      <section className="card">
        <h3>Temporizador de debate</h3>
        <Segmented value={s.timerSeconds} onChange={(v) => set({ timerSeconds: v })}
          options={[{ value: 0, label: 'No' }, { value: 60, label: '1 min' }, { value: 120, label: '2 min' }, { value: 180, label: '3 min' }, { value: 300, label: '5 min' }]} />
      </section>

      <section className="card">
        <div className="card-head">
          <h3>Categorías</h3>
          <button className="link" onClick={() => set({ categories: s.categories.length >= CATEGORIES.length ? (customOn ? [CUSTOM_CATEGORY_ID] : []) : [...CATEGORIES.map((c) => c.id), ...(customOn ? [CUSTOM_CATEGORY_ID] : [])] })}>
            {s.categories.filter((c) => c !== CUSTOM_CATEGORY_ID).length >= CATEGORIES.length ? 'Ninguna' : 'Todas'}
          </button>
        </div>
        <div className="chips">
          {CATEGORIES.map((c) => (
            <button key={c.id} className={`chip ${s.categories.includes(c.id) ? 'on' : ''}`} onClick={() => toggleCat(c.id)}>
              <span>{c.emoji}</span> {c.name}
            </button>
          ))}
          <button className={`chip ${customOn ? 'on' : ''}`} onClick={() => toggleCat(CUSTOM_CATEGORY_ID)}>
            <span>✍️</span> Tus palabras
          </button>
        </div>
        {customOn && (
          <textarea className="custom-words" rows={3} placeholder="Escribe palabras separadas por comas: Mi abuela, El viaje a Roma, Paco…"
            value={s.customWords.join(', ')}
            onChange={(e) => set({ customWords: e.target.value.split(',').map((w) => w.trimStart()) })} />
        )}
      </section>

      <div className="sticky-cta">
        {error && <p className="error">{error}</p>}
        <button className="btn primary big" disabled={!!error} onClick={onStart}>Repartir cartas</button>
        <BannerAd />
      </div>
    </div>
  );
}

function uniqueName(name: string, existing: string[]) {
  const lower = existing.map((e) => e.trim().toLowerCase());
  if (!lower.includes(name.toLowerCase())) return name;
  let i = 2;
  while (lower.includes(`${name} ${i}`.toLowerCase())) i++;
  return `${name} ${i}`;
}
