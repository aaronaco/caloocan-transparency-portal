import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta = {
  title: 'UI/Toggle group',
  parameters: {
    docs: {
      description: {
        component:
          'A row of tiles that each switch a filter on and off (`aria-pressed`). ' +
          '`.groups` filters the project list by status; `.ystrip` picks a year on the 2020–2026 page.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const TILES = [
  { key: 'house_only', label: 'In the House bill only', sub: 'Insertion candidates', n: 48, php: '₱1.05B' },
  { key: 'nep_only', label: 'In the NEP only', sub: 'Deletion candidates', n: 25, php: '₱449.7M' },
  { key: 'unchanged', label: 'Same amount in both', sub: 'Matched, no change', n: 93, php: '₱2.08B' },
  { key: 'increased', label: 'Higher in the House bill', sub: 'Matched, amount raised', n: 0, php: '—' },
  { key: 'decreased', label: 'Lower in the House bill', sub: 'Matched, amount reduced', n: 2, php: '−₱15.0M' },
  { key: 'scope_review', label: 'Different stretch of the same road', sub: 'Not counted as a change', n: 0, php: '—' },
];

function Tiles() {
  const [on, setOn] = useState('');
  return (
    <div className="groups" role="group" aria-label="Filter by status">
      {TILES.map((t) => (
        <button
          key={t.key}
          type="button"
          className={`group-tile${on === t.key ? ' active' : ''}`}
          disabled={!t.n}
          aria-pressed={on === t.key}
          onClick={() => setOn(on === t.key ? '' : t.key)}
        >
          <span className="group-label"><span className={`status-dot g-${t.key}`} aria-hidden="true" />{t.label}</span>
          <span className="label">{t.sub}</span>
          <span className="group-count num">{t.n}</span>
          <span className="group-php num">{t.php}</span>
        </button>
      ))}
    </div>
  );
}

const YEARS = [
  { year: 2020, share: 0.62, label: '₱1.24B', programs: 31 },
  { year: 2021, share: 0.78, label: '₱1.56B', programs: 38 },
  { year: 2022, share: 1, label: '₱2.0B', programs: 44 },
  { year: 2023, share: 0.7, label: '₱1.4B', programs: 35 },
  { year: 2024, share: 0.55, label: '₱1.1B', programs: 29 },
  { year: 2025, share: 0.81, label: '₱1.62B', programs: 40 },
  { year: 2026, share: 0.66, label: '₱1.32B', programs: 33 },
];

function Years() {
  const [on, setOn] = useState(0);
  return (
    <div className="ystrip" role="group" aria-label="Pick a year">
      {YEARS.map((t) => (
        <button
          key={t.year}
          type="button"
          className={`ycell${on === t.year ? ' active' : ''}`}
          aria-pressed={on === t.year}
          onClick={() => setOn(on === t.year ? 0 : t.year)}
        >
          <span className="label">{t.year}</span>
          <span className="ybar"><span style={{ height: `${t.share * 100}%` }} /></span>
          <span className="yv num">{t.label}</span>
          <span className="ysub">{t.programs} programs funded</span>
        </button>
      ))}
    </div>
  );
}

export const StatusTiles: Story = { render: () => <Tiles /> };

export const YearStrip: Story = { render: () => <Years /> };
