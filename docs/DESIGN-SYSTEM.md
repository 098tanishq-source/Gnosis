# Design system and source mapping

The archives contain multiple visual systems. This implementation preserves screen-specific typography and colour instead of combining conflicting global themes. It is a functional four-tab prototype, not a pixel-for-pixel reproduction of every supplied screen.

| Source | Usage |
| --- | --- |
| `home-sceens.zip`, Oceanic Academic DESIGN.md and Physics HTML | Ocean/navy shell, subject shelf, Plus Jakarta Sans, rounded cards and navy hero |
| `stitch_student_performance_analytics_dashboard (1).zip` and `(2).zip` | Shared Oceanic subject references; duplicate design text deduplicated |
| `analytics_dashboard (1).zip`, code.html | Preferred ocean analytical palette, navy/teal actions, #f4f9fd canvas |
| Original dashboard ZIP, Clarity Academic Analytics DESIGN.md | Semantic emerald/amber/rose statuses, tabular metrics and calm hierarchy; older indigo is not used globally |
| `chat-box-ui.zip`, DESIGN.md and HTML | Cyan/charcoal AI theme, Inter body, JetBrains Mono formula, question bubble and hint panel |
| Original dashboard ZIP, Alexandria DESIGN.md | Reserved for a future full reading view. Its serif and no-border editorial rules conflict with the selected subject UI and are not applied to this chapter shelf |

Where design prose differs from a screen’s HTML configuration, the corresponding HTML palette takes precedence. Physics and chat screenshots were visually inspected. The ocean analytics PNG could not be decoded by the viewer; its HTML was inspected instead.

## Exact active tokens

| Role | Ocean/default | Socratic AI |
| --- | --- | --- |
| Canvas | #f4f9fd | #e9fdff |
| Surface | #ffffff | #ffffff |
| Subdued surface | #eff6fb | #d8fafd |
| Structural primary | #134074 | #313838 |
| Action/accent | #0077b6 | #971e55 |
| Main text | #0a2239 | #002022 |
| Secondary text | #415a77 | #434848 |
| Outline | #c5d7e3 | #c3c7c7 |
| Focus | #48cae4 | #006670 |

Emerald communicates correct/offline status; amber communicates timing warnings. Text labels accompany semantic colour. Timing numbers use tabular figures.

## Fonts and hierarchy

- Plus Jakarta Sans Variable: shell, test, analysis, chapters and video.
- Inter Variable: Socratic AI screen.
- JetBrains Mono Variable: chat formula/constant.
- Page headings: 28px mobile, 40px desktop, weight 700, tight tracking.
- Body: 14–16px with open line-height; prompts: 18–20px.
- Labels: 11–12px with modest positive tracking.
- Local Latin normal WOFF2 variable subsets, `font-display: swap`. Initial font loads with shell; chat fonts load with AI CSS. Other scripts use available fallback fonts.

## Layout and interaction

Cards use 16px radii, hero panels 24px, buttons 8px, metadata pills fully rounded. A 4px spacing rhythm, 20px phone margins and 32px larger margins keep the layout readable. The prototype caps content at 1120px rather than the reference’s maximum 1360px, appropriate for three-question practice.

Mobile layout stacks vertically; the test/progress pair splits on tablet and desktop. Bottom navigation has four slots, a visible active background and dot, and safe-area padding. Touch controls are at least 44px tall, slightly larger than reference 40px buttons. Native radios and fieldsets retain keyboard semantics; hints use a polite live region; chapter expansion exposes state. Browser zoom remains enabled, unlike some reference HTML.

## Low-device adaptations

Lite mode is on by default: no backdrop blur, shadows, animation or transitions. Opaque tonal layers preserve hierarchy with less compositing. Turning it off restores a modest navigation blur. Reduced-motion preference still wins. No background pulses or decorative animations run by default.

We retain Lucide SVGs as requested rather than the reference Material Symbols font, and compile Tailwind at build time rather than shipping its browser CDN compiler. No screenshot-sized raster assets are downloaded.

## Editing

Change global values in `src/styles/tokens.css`, shared layout in `src/styles/index.css`, and feature layouts in their own JSX files. Do not copy source CDN scripts into the app.
