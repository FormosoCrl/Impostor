import { CATEGORIES, CUSTOM_CATEGORY_ID, type WordPair } from '../data/words';

export type Role = 'civil' | 'impostor' | 'despistado';
export type HintMode = 'none' | 'category' | 'word';

export interface Settings {
  players: string[];
  impostors: number;
  despistado: boolean;
  hint: HintMode;
  impostorsCanGuess: boolean;
  timerSeconds: number; // 0 = sin temporizador
  categories: string[];
  customWords: string[];
}

export interface PlayerState {
  name: string;
  role: Role;
  word: string | null; // null = no recibe palabra (impostor)
  hint: string | null;
  alive: boolean;
}

export interface Game {
  players: PlayerState[];
  word: string;
  categoryName: string;
  starter: number;
  round: number;
  winner: null | 'civiles' | 'impostores';
  winReason: string;
}

export const DEFAULT_SETTINGS: Settings = {
  players: ['Jugador 1', 'Jugador 2', 'Jugador 3', 'Jugador 4'],
  impostors: 1,
  despistado: false,
  hint: 'category',
  impostorsCanGuess: true,
  timerSeconds: 0,
  categories: CATEGORIES.map((c) => c.id),
  customWords: [],
};

// Aleatoriedad criptográfica: cada jugador tiene la misma probabilidad de ser impostor.
export function randInt(max: number): number {
  if (max <= 0) return 0;
  const buf = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max;
  let x: number;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % max;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Máximo de "malos" (impostores + despistado) para que el juego tenga sentido. */
export function maxBad(playerCount: number): number {
  return Math.max(1, Math.floor((playerCount - 1) / 2));
}

export function maxImpostors(playerCount: number, despistado: boolean): number {
  return Math.max(1, maxBad(playerCount) - (despistado ? 1 : 0));
}

interface Pick { pair: WordPair; categoryName: string }

const RECENT_KEY = 'impostor.recentWords';

function pickWord(s: Settings): Pick {
  const pool: Pick[] = [];
  for (const c of CATEGORIES) {
    if (s.categories.includes(c.id)) c.words.forEach((pair) => pool.push({ pair, categoryName: c.name }));
  }
  if (s.categories.includes(CUSTOM_CATEGORY_ID)) {
    const custom = s.customWords.map((w) => w.trim()).filter(Boolean);
    custom.forEach((w) => {
      const others = custom.filter((o) => o !== w);
      const similar = others.length ? others[randInt(others.length)] : w;
      pool.push({ pair: [w, similar], categoryName: 'Tus palabras' });
    });
  }
  if (pool.length === 0) throw new Error('Elige al menos una categoría');

  // Evita repetir palabras recientes mientras se pueda.
  let recent: string[] = [];
  try { recent = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); } catch { /* sin almacenamiento */ }
  const fresh = pool.filter((p) => !recent.includes(p.pair[0]));
  const source = fresh.length ? fresh : pool;
  const chosen = source[randInt(source.length)];
  try {
    const next = [chosen.pair[0], ...recent].slice(0, Math.min(150, Math.floor(pool.length * 0.7)));
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch { /* sin almacenamiento */ }
  return chosen;
}

export function newGame(s: Settings): Game {
  const n = s.players.length;
  const { pair, categoryName } = pickWord(s);
  const [word, similar] = pair;
  const impostorCount = Math.min(s.impostors, maxImpostors(n, s.despistado));
  const order = shuffle([...Array(n).keys()]);
  const impostorIdx = new Set(order.slice(0, impostorCount));
  const despistadoIdx = s.despistado ? order[impostorCount] : -1;

  const players: PlayerState[] = s.players.map((name, i) => {
    if (impostorIdx.has(i)) {
      const hint = s.hint === 'category' ? categoryName : s.hint === 'word' ? similar : null;
      return { name, role: 'impostor', word: null, hint, alive: true };
    }
    if (i === despistadoIdx) return { name, role: 'despistado', word: similar, hint: null, alive: true };
    return { name, role: 'civil', word, hint: null, alive: true };
  });

  return { players, word, categoryName, starter: randInt(n), round: 1, winner: null, winReason: '' };
}

export function isBad(p: PlayerState) {
  return p.role !== 'civil';
}

/** Comprueba si alguien ha ganado tras una eliminación. */
export function checkWinner(g: Game): Game {
  const alive = g.players.filter((p) => p.alive);
  const bad = alive.filter(isBad).length;
  const good = alive.length - bad;
  if (bad === 0) return { ...g, winner: 'civiles', winReason: 'Habéis descubierto a todos los impostores.' };
  if (bad >= good) return { ...g, winner: 'impostores', winReason: 'Los impostores ya son tantos como los civiles.' };
  return g;
}

export function eliminate(g: Game, idx: number): Game {
  const players = g.players.map((p, i) => (i === idx ? { ...p, alive: false } : p));
  return { ...g, players };
}

export function nextRound(g: Game): Game {
  const n = g.players.length;
  let s = (g.starter + 1) % n;
  while (!g.players[s].alive) s = (s + 1) % n;
  return { ...g, round: g.round + 1, starter: s };
}

export const ROLE_LABEL: Record<Role, string> = {
  civil: 'Civil',
  impostor: 'Impostor',
  despistado: 'Despistado',
};
