# FinanzPilot

Finanz-Dashboard-UI mit selbst gebauten Chart-Komponenten. Next.js App Router, shadcn/ui, Tailwind, WebGL-Shader-Hintergrund. Läuft mit Beispieldaten aus `lib/mock-data.ts`, es gibt kein Backend und keine echten Kontodaten.

## Seiten

| Route | Inhalt |
|---|---|
| `/` | Dashboard: Gesamtsaldo, Einnahmen/Ausgaben der letzten 30 Tage, Wochenübersicht, letzte Transaktionen |
| `/balance` | Kontostand und Verlauf |
| `/transactions` | Transaktionsliste mit Kategorien |
| `/budgets` | Budgets pro Kategorie mit Fortschrittsringen |
| `/goals` | Sparziele |
| `/analyse` | Ausgaben-Mix und Kategorie-Auswertung |
| `/setup` | Einrichtung |

## Eigene UI-Bausteine

`components/ui/` enthält neben den shadcn-Basics eigene Komponenten ohne Chart-Library: `bar-chart`, `donut-chart`, `spark-line`, `progress-ring`, `container-scroll-animation`, `liquid-glass-button` sowie `shader-background` und `web-gl-shader` für den animierten Hintergrund.

## Starten

```bash
npm install
npm run dev
```

Dann http://localhost:3000 öffnen.

## Stack

Next.js · React · TypeScript · Tailwind CSS · shadcn/ui · lucide-react · WebGL

## Lizenz

MIT

---

*Hinweis zur Historie: Dieses Projekt wurde am 07.09.2026 auf GitHub importiert. Die Commits davor sind aus den Änderungsdaten der Dateien rekonstruiert (ein Commit pro Arbeitstag) und zeigen, wann an welchen Dateien gearbeitet wurde.*
