import { useEffect, useState, type ReactNode } from 'react';
import { CONFIG, buyRemoveAds, isPremium, onPremiumChange } from '../lib/monetization';

export function usePremium() {
  const [p, setP] = useState(isPremium());
  useEffect(() => onPremiumChange(setP), []);
  return p;
}

export function Modal({ children, onClose }: { children: ReactNode; onClose?: () => void }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

export function Toggle({ label, desc, value, onChange }: { label: string; desc?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" className="row toggle-row" onClick={() => onChange(!value)} aria-pressed={value}>
      <span className="row-text">
        <span className="row-label">{label}</span>
        {desc && <span className="row-desc">{desc}</span>}
      </span>
      <span className={`switch ${value ? 'on' : ''}`}><span /></span>
    </button>
  );
}

export function Segmented<T extends string | number>({ options, value, onChange }: { options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="segmented">
      {options.map((o) => (
        <button type="button" key={String(o.value)} className={o.value === value ? 'active' : ''} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Stepper({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="stepper">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Menos">−</button>
      <span>{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Más">+</button>
    </div>
  );
}

/** Banner de anuncio (de prueba). Desaparece con premium. */
export function BannerAd() {
  const premium = usePremium();
  if (premium) return null;
  return <div className="banner-ad" role="complementary">Espacio publicitario · anuncio de prueba</div>;
}

/** Muro de anuncios entre partidas (de prueba). */
export function AdWall({ onDone, onRemoveAds }: { onDone: () => void; onRemoveAds: () => void }) {
  const [left, setLeft] = useState(CONFIG.demoAdSeconds);
  const premium = usePremium();
  useEffect(() => { if (premium) onDone(); }, [premium, onDone]);
  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  return (
    <div className="adwall">
      <div className="adwall-top">
        <span className="ad-tag">Anuncio</span>
        <button className="btn small ghost" disabled={left > 0} onClick={onDone}>
          {left > 0 ? `Cerrar en ${left}` : 'Cerrar ✕'}
        </button>
      </div>
      <div className="adwall-body">
        <div className="ad-placeholder">
          <div className="ad-emoji">📺</div>
          <p>Aquí irá un anuncio real</p>
          <small>AdMob en la app · AdSense en la web</small>
        </div>
      </div>
      <button className="btn secondary" onClick={onRemoveAds}>Quitar anuncios para siempre · {CONFIG.removeAdsPrice}</button>
    </div>
  );
}

export function RemoveAdsModal({ onClose }: { onClose: () => void }) {
  const [busy, setBusy] = useState(false);
  const premium = usePremium();
  return (
    <Modal onClose={onClose}>
      {premium ? (
        <>
          <h2>¡Gracias! 🎉</h2>
          <p>Ya no verás anuncios en este dispositivo.</p>
          <button className="btn primary" onClick={onClose}>Seguir jugando</button>
        </>
      ) : (
        <>
          <h2>Juega sin anuncios</h2>
          <ul className="perks">
            <li>Sin muros de anuncios entre partidas</li>
            <li>Sin banners</li>
            <li>Pago único, para siempre</li>
          </ul>
          <button className="btn primary" disabled={busy} onClick={async () => { setBusy(true); await buyRemoveAds(); setBusy(false); }}>
            {busy ? 'Procesando…' : `Quitar anuncios · ${CONFIG.removeAdsPrice}`}
          </button>
          <p className="fineprint">Modo demo: no se realiza ningún cobro.</p>
          <button className="btn ghost" onClick={onClose}>Ahora no</button>
        </>
      )}
    </Modal>
  );
}
