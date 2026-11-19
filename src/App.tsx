import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_SETTINGS, checkWinner, eliminate, newGame, nextRound, type Game, type Settings } from './lib/game';
import { shouldShowInterstitial } from './lib/monetization';
import { AdWall, Modal, RemoveAdsModal } from './components/ui';
import { Home } from './screens/Home';
import { Setup } from './screens/Setup';
import { Reveal } from './screens/Reveal';
import { Play } from './screens/Play';
import { Vote } from './screens/Vote';
import { Result } from './screens/Result';

type Screen = 'home' | 'setup' | 'reveal' | 'play' | 'vote' | 'result';
const SETTINGS_KEY = 'impostor.settings.v1';

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch { /* sin almacenamiento */ }
  return DEFAULT_SETTINGS;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [game, setGame] = useState<Game | null>(null);
  const [adWall, setAdWall] = useState(false);
  const [removeAds, setRemoveAds] = useState(false);
  const [confirmQuit, setConfirmQuit] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch { /* sin almacenamiento */ }
  }, [settings]);

  useEffect(() => { window.scrollTo(0, 0); }, [screen]);

  const start = () => {
    const clean = { ...settings, players: settings.players.map((p) => p.trim()) };
    setSettings(clean);
    setGame(newGame(clean));
    if (shouldShowInterstitial()) setAdWall(true);
    setScreen('reveal');
  };

  const closeAd = useCallback(() => setAdWall(false), []);

  const quit = () => { setConfirmQuit(false); setGame(null); setScreen('setup'); };

  return (
    <div className="app">
      {screen === 'home' && <Home onPlay={() => setScreen('setup')} onRemoveAds={() => setRemoveAds(true)} />}
      {screen === 'setup' && <Setup settings={settings} onChange={setSettings} onStart={start} onBack={() => setScreen('home')} />}
      {screen === 'reveal' && game && !adWall && <Reveal key={game.word + game.starter} game={game} onDone={() => setScreen('play')} onQuit={() => setConfirmQuit(true)} />}
      {screen === 'play' && game && <Play game={game} timerSeconds={settings.timerSeconds} onVote={() => setScreen('vote')} onQuit={() => setConfirmQuit(true)} />}
      {screen === 'vote' && game && (
        <Vote
          key={game.round}
          game={game}
          impostorsCanGuess={settings.impostorsCanGuess}
          onEliminate={(i) => setGame(eliminate(game, i))}
          onContinue={() => {
            const g = checkWinner(game);
            if (g.winner) { setGame(g); setScreen('result'); }
            else { setGame(nextRound(g)); setScreen('play'); }
          }}
          onImpostorGuessed={(i) => {
            setGame({ ...game, winner: 'impostores', winReason: `${game.players[i].name} adivinó la palabra en el último momento.` });
            setScreen('result');
          }}
          onBack={() => setScreen('play')}
        />
      )}
      {screen === 'result' && game && <Result game={game} onReplay={start} onSettings={() => setScreen('setup')} />}

      {adWall && <AdWall onDone={closeAd} onRemoveAds={() => setRemoveAds(true)} />}
      {removeAds && <RemoveAdsModal onClose={() => setRemoveAds(false)} />}
      {confirmQuit && (
        <Modal onClose={() => setConfirmQuit(false)}>
          <h2>¿Terminar la partida?</h2>
          <p>Se perderá la partida en curso.</p>
          <button className="btn danger" onClick={quit}>Terminar</button>
          <button className="btn ghost" onClick={() => setConfirmQuit(false)}>Seguir jugando</button>
        </Modal>
      )}
    </div>
  );
}
