import styles from './journal.module.css';
import Link from 'next/link';

export default function JournalPage() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Lakefront Journal</h1>
        <p className={styles.meta}>Daily reflections, rituals & roasts ☕</p>
      </header>

      <section className={styles.grid}>
        <form className={styles.card}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="date">Date</label>
            <input className={styles.input} id="date" type="date" />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="brew">Coffee / Tea</label>
            <input
              className={styles.input}
              id="brew"
              placeholder="E.g., Ethiopia natural pour-over"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="mood">Current mood</label>
            <input
              className={styles.input}
              id="mood"
              placeholder="Grateful, focused, energized…"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="prompt">Today’s reflection</label>
            <textarea
              className={styles.textarea}
              id="prompt"
              rows={6}
              placeholder="What am I working toward today? What would make today great?"
            />
          </div>

          <button className={styles.button} type="button">
            Save (local for now)
          </button>

          <p className={styles.hint}>
            Token-gated & on-chain saving will be added later. For now this page is
            fully usable under your domain.
          </p>
        </form>

        <aside className={styles.card}>
          <h3 className={styles.asideTitle}>Quick links</h3>
          <ul className={styles.links}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/embed/reserve-journal">Reserve (embed)</Link></li>
          </ul>

          <h3 className={styles.asideTitle}>Suggestions</h3>
          <ul className={styles.bullets}>
            <li>Note aroma, acidity, body, finish.</li>
            <li>Write 1 micro-goal for the day.</li>
            <li>End with 1 gratitude line.</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
