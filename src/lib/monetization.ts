import { Capacitor } from '@capacitor/core';

/**
 * Capa de monetización.
 *
 * Hoy funciona en modo DEMO: los anuncios son de prueba (pantalla simulada) y la compra
 * de "Quitar anuncios" se guarda en el dispositivo sin cobrar.
 *
 * Para producción se sustituyen los proveedores de abajo:
 *  - Web:     Google AdSense / Ad Manager (anuncio entre partidas) + pago con Stripe o RevenueCat Web Billing.
 *  - Android/iOS (Capacitor): AdMob (@capacitor-community/admob) + compras con RevenueCat
 *    (Google Play Billing / App Store) para el producto "remove_ads".
 */

export const CONFIG = {
  /** Muestra un anuncio a pantalla completa cada N partidas (la primera de la sesión nunca). */
  interstitialEveryNGames: 1,
  /** Segundos antes de poder cerrar el anuncio de prueba. */
  demoAdSeconds: 5,
  removeAdsPrice: '2,99 €',
  productId: 'remove_ads',
};

export type Platform = 'web' | 'android' | 'ios';
export const platform = (): Platform => Capacitor.getPlatform() as Platform;

const PREMIUM_KEY = 'impostor.premium';
const listeners = new Set<(v: boolean) => void>();

export function isPremium(): boolean {
  try { return localStorage.getItem(PREMIUM_KEY) === '1'; } catch { return false; }
}

function setPremium(v: boolean) {
  try { localStorage.setItem(PREMIUM_KEY, v ? '1' : '0'); } catch { /* sin almacenamiento */ }
  listeners.forEach((l) => l(v));
}

export function onPremiumChange(fn: (v: boolean) => void) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

let gamesThisSession = 0;

/** Llamar al empezar cada partida. Devuelve true si toca mostrar el muro de anuncios. */
export function shouldShowInterstitial(): boolean {
  gamesThisSession += 1;
  if (isPremium()) return false;
  if (gamesThisSession === 1) return false;
  return (gamesThisSession - 1) % CONFIG.interstitialEveryNGames === 0;
}

/** Compra "Quitar anuncios". DEMO: no cobra, solo marca el dispositivo como premium. */
export async function buyRemoveAds(): Promise<boolean> {
  // TODO producción: Purchases.purchaseStoreProduct(...) (RevenueCat) o checkout de Stripe en web.
  await new Promise((r) => setTimeout(r, 600));
  setPremium(true);
  return true;
}

export async function restorePurchases(): Promise<boolean> {
  // TODO producción: Purchases.restorePurchases() y comprobar el entitlement "premium".
  return isPremium();
}

/** Solo para pruebas: vuelve a activar los anuncios. */
export function resetPremiumForTesting() {
  setPremium(false);
}
