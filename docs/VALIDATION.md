# Validation and performance notes

## Passed

- Dependency installation with a committed package-lock.json.
- Vite production compilation: all JSX and imports resolved; compiled Tailwind CSS generated.
- Three Node test cases: strict 30-second time-trap boundary; independent accumulated timing with pauses and revisits; correct/incorrect/skipped and negative scoring.

## Production output

Measured by Vite on this build (decimal KB, rounded):

| Asset | Uncompressed | Gzip |
| --- | ---: | ---: |
| Initial JavaScript including React and mock test | 240.17 KB | 76.12 KB |
| Shared CSS | 19.93 KB | 5.39 KB |
| AI JS | 2.46 KB | 1.16 KB |
| Chapter JS | 3.10 KB | 1.42 KB |
| Player JS | 1.90 KB | 1.05 KB |
| Initial Plus Jakarta Sans WOFF2 | 27.35 KB | Already compressed |
| Deferred Inter WOFF2 | 48.26 KB | Already compressed |
| Deferred JetBrains Mono WOFF2 | 40.40 KB | Already compressed |

Approximately 109 KB for initial compressed JS/CSS plus font, excluding headers and HTML. Hosting must enable compression to realise the gzip transfer sizes. Fonts are local assets; no Google Fonts request occurs. Video traffic is additional, after Load lesson. Bundle size is not equivalent to a measured frame-rate, Lighthouse score or low-end hardware benchmark.

## Not verified

Browser automation could not run in this environment: the available headless Chromium failed to initialise its graphics process. Therefore responsive rendering, real browser interaction, screen-reader behaviour, live YouTube availability and real-device performance are not claimed as verified. Screenshots of this implementation are not included.

## Manual acceptance checklist

- Test at 320, 360, 768 and 1366px viewport widths; ensure no horizontal overflow or bottom-nav overlap.
- Answer question 1, switch to question 2, then return; both the selected answer and accumulated time must persist.
- Leave Mock Test or hide the browser tab; elapsed active time should pause.
- Spend over 30 seconds on one question; submit and confirm exactly that question is tagged.
- Submit all answers correct for 12 points; all wrong for −3; skip all for 0.
- Retry clears answers, submitted state and all times.
- Reveal the AI hint; verify the numeric final answer is not supplied. Switch tabs and confirm the revealed hint persists.
- Expand/collapse each chapter; ensure titles and notes are readable with browser zoom.
- Confirm no iframe exists until Load lesson. Leave the player and confirm video stops.
- Navigate with keyboard and inspect focus rings. Enable OS reduced motion.
- Test Lite mode on a physical low-end Android device with network/CPU throttling; measure loading and input responsiveness before setting production budgets.

## Reference documentation

- https://vite.dev/guide/
- https://tailwindcss.com/docs/installation/using-vite
