# Impostor

Juego de fiesta para jugar en un solo móvil: todos reciben la misma palabra secreta menos el impostor. Dad pistas, debatid y votad para descubrirlo.

Web instalable (PWA, funciona sin conexión) y base para la app Android/iOS con Capacitor.

## Funciones

- De 3 a 20 jugadores; los nombres y ajustes se recuerdan.
- 1 o más impostores (el máximo se ajusta al número de jugadores).
- Rol opcional **Despistado**: recibe una palabra parecida y no sabe que es distinta.
- Pista para el impostor: ninguna, la categoría o una palabra parecida.
- "Última oportunidad": el impostor descubierto puede ganar si adivina la palabra.
- 10 categorías propias (300 palabras) + "Tus palabras" personalizadas.
- Reparto secreto manteniendo pulsada la carta, orden de turnos aleatorio, temporizador de debate, votación y rondas hasta que gane un bando.
- Sorteo de roles con aleatoriedad criptográfica y sin repetir palabras recientes.

## Desarrollo

```bash
npm install
npm run dev       # servidor local
npm run build     # genera dist/
npm run preview   # sirve dist/ en http://localhost:4173
```

Para probar en el móvil en la misma wifi: `npm run dev -- --host` y abre la IP que aparece.

## Publicar la web

Cualquier hosting estático sirve con el contenido de `dist/` (Vercel, Netlify, Cloudflare Pages…).
Para GitHub Pages en `usuario.github.io/Impostor/`, compila con `BASE=/Impostor/ npm run build`.

## App Android / iOS (Capacitor)

```bash
npm install @capacitor/android      # y/o @capacitor/ios
npm run build
npx cap add android                 # solo la primera vez
npx cap sync
npx cap open android                # abre Android Studio para compilar y firmar
```

## Monetización

Toda la lógica está en `src/lib/monetization.ts` y hoy funciona en **modo demo** (anuncios simulados, compra sin cobro):

- Muro de anuncios a pantalla completa entre partidas (nunca en la primera), configurable con `interstitialEveryNGames`.
- Banners en portada, ajustes y resultado.
- Compra única "Quitar anuncios" que elimina muros y banners.

Para activarla de verdad:

| Plataforma | Anuncios | Pago "Quitar anuncios" |
|---|---|---|
| Android / iOS | AdMob (`@capacitor-community/admob`) | RevenueCat → Google Play Billing / App Store |
| Web | Google AdSense o Ad Manager | Stripe o RevenueCat Web Billing |

Necesitas tus cuentas de AdMob, AdSense, Google Play Console (y Apple Developer para iOS), crear el producto `remove_ads` y sustituir las funciones marcadas con `TODO producción`.
