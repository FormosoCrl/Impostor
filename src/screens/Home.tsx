import { useState } from 'react';
import { BannerAd, Modal, usePremium } from '../components/ui';

export function Home({ onPlay, onRemoveAds }: { onPlay: () => void; onRemoveAds: () => void }) {
  const [rules, setRules] = useState(false);
  const premium = usePremium();
  return (
    <div className="screen home">
      <div className="home-hero">
        <div className="logo-mark" aria-hidden>🕵️</div>
        <h1 className="logo">IMPOSTOR</h1>
        <p className="tagline">Todos saben la palabra… menos uno.</p>
      </div>
      <div className="stack">
        <button className="btn primary big" onClick={onPlay}>Jugar</button>
        <button className="btn secondary" onClick={() => setRules(true)}>Cómo se juega</button>
        {!premium && <button className="btn ghost" onClick={onRemoveAds}>✨ Quitar anuncios</button>}
      </div>
      <BannerAd />
      {rules && (
        <Modal onClose={() => setRules(false)}>
          <h2>Cómo se juega</h2>
          <ol className="rules">
            <li><b>Reparto.</b> Pasad el móvil. Cada uno mira su carta en secreto: los civiles ven la palabra, el impostor no.</li>
            <li><b>Pistas.</b> Por turnos, cada jugador dice una palabra relacionada. Ni muy obvia (el impostor la pillaría) ni muy rara (sospecharán de ti).</li>
            <li><b>Debate y voto.</b> Discutid y votad a quién eliminar. Se revela su rol.</li>
            <li><b>Fin.</b> Los civiles ganan si eliminan a todos los impostores. Los impostores ganan si llegan a ser tantos como los civiles, o si adivinan la palabra al ser descubiertos.</li>
          </ol>
          <h3>Despistado (opcional)</h3>
          <p>Recibe una palabra parecida pero distinta, y no sabe que es el raro. Juega en el equipo de los impostores.</p>
          <button className="btn primary" onClick={() => setRules(false)}>¡Entendido!</button>
        </Modal>
      )}
    </div>
  );
}
