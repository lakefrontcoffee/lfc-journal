'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './journal.module.css';

type Entry = {
  dateISO: string;
  mood: string;
  coffee: string;
  microGoal: string;
  reflection: string;
};

type JournalState = Record<number, Entry>; // day 1..7

const STORAGE_KEY = 'lfc_journal_v1';

const PROMPTS = [
  "What's one thing you're grateful for this morning?",
  'How do you want to feel today?',
  'What micro-goal will move you 1% forward?',
  'Which coffee/tea are you sipping? Any tasting notes?',
  'Free reflection (thoughts, intentions, or doodles)',
];

function loadInitial(): JournalState {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as JournalState) : {};
  } catch {
    return {};
  }
}

function save(state: JournalState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export default function JournalPage() {
  const [day, setDay] = useState<number>(1);
  const [state, setState] = useState<JournalState>({});

  // load once on mount
  useEffect(() => {
    setState(loadInitial());
  }, []);

  // convenience helpers
  const entry = useMemo<Entry>(() => {
    const existing = state[day];
    return (
      existing ?? {
        dateISO: new Date().toISOString(),
        mood: '',
        coffee: '',
        microGoal: '',
        reflection: '',
      }
    );
  }, [state, day]);

  function update<K extends keyof Entry>(key: K, value: Entry[K]) {
    const next: JournalState = {
      ...state,
      [day]: { ...entry, [key]: value },
    };
    setState(next);
    save(next);
  }

  function clearDay() {
    const next = { ...state };
    delete next[day];
    setState(next);
    save(next);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lakefront-journal-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className={styles.wrap}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.beanLeft} />
          <h1>Lakefront Journal</h1>
          <span className={styles.beanRight} />
        </div>
        <p className={styles.tagline}>Reflections • Rituals • Roasts</p>

        <div className={styles.actions}>
          <button className={styles.ghost} onClick={exportJson} aria-label="Export journal as JSON">
            Export .json
          </button>
          <a className={styles.linkBtn} href="/" aria-label="Back to Lakefront Coffee">
            ← Back to LakefrontCoffee
          </a>
        </div>
      </header>

      {/* Spiral notepad */}
      <div className={styles.notepad}>
        <div className={styles.rings}>
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        {/* Day selector */}
        <nav className={styles.days}>
          {Array.from({ length: 7 }).map((_, i) => {
            const n = i + 1;
            const filled = !!state[n];
            return (
              <button
                key={n}
                className={`${styles.dayBtn} ${day === n ? styles.active : ''} ${
                  filled ? styles.filled : ''
                }`}
                onClick={() => setDay(n)}
                aria-label={`Go to Day ${n}${filled ? ' (completed)' : ''}`}
              >
                Day {n}
              </button>
            );
          })}
        </nav>

        {/* Page */}
        <section className={styles.page}>
          <div className={styles.dateRow}>
            <label>Date</label>
            <input
              type="date"
              value={(entry.dateISO ?? new Date().toISOString()).slice(0, 10)}
              onChange={(e) =>
                update('dateISO', new Date(e.target.value).toISOString())
              }
            />
          </div>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>Gratitude</h3>
              <textarea
                placeholder={PROMPTS[0]}
                value={entry.mood}
                onChange={(e) => update('mood', e.target.value)}
                rows={3}
              />
            </div>

            <div className={styles.card}>
              <h3>Intentions</h3>
              <input
                placeholder={PROMPTS[1]}
                value={entry.microGoal}
                onChange={(e) => update('microGoal', e.target.value)}
              />
            </div>

            <div className={styles.card}>
              <h3>Today’s Brew</h3>
              <input
                placeholder="Coffee or tea, brew method, tasting notes…"
                value={entry.coffee}
                onChange={(e) => update('coffee', e.target.value)}
              />
            </div>

            <div className={`${styles.card} ${styles.wide}`}>
              <h3>Reflection</h3>
              <textarea
                placeholder={PROMPTS[4]}
                value={entry.reflection}
                onChange={(e) => update('reflection', e.target.value)}
                rows={6}
              />
            </div>
          </div>

          <div className={styles.footerRow}>
            <button className={styles.danger} onClick={clearDay}>
              Clear Day {day}
            </button>
            <span className={styles.savedHint}>Autosaved ✓</span>
          </div>
        </section>
      </div>

      {/* Tiny info */}
      <footer className={styles.footer}>
        <small>
          v1 • Stored privately in your browser. You can export and back up at any time.
        </small>
      </footer>
    </main>
  );
}

