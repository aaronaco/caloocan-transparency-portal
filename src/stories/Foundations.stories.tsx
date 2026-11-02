import type { Meta, StoryObj } from '@storybook/react-vite';
import { useLayoutEffect, useRef, useState, type Ref } from 'react';

const meta: Meta = {
  title: 'Foundations',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The colours and text styles the site uses, read live from theme.css and app.css, so this page changes when they do. ' +
          'It is the reference for the readability work: every colour shows its contrast on white, and every text style ' +
          'shows the size it actually renders at.',
      },
    },
  },
  globals: { viewport: { value: 'desktop', isRotated: false } },
};
export default meta;

function rgb(css: string): [number, number, number] {
  const m = css.match(/\d+(\.\d+)?/g)?.map(Number) ?? [0, 0, 0];
  return [m[0], m[1], m[2]];
}

function luminance([r, g, b]: [number, number, number]): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(rgb(a)), luminance(rgb(b))].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function useResolved(css: string) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState('');
  useLayoutEffect(() => {
    if (ref.current) setValue(getComputedStyle(ref.current).color);
  }, [css]);
  return [ref, value] as const;
}

const TOKENS: { name: string; use: string }[] = [
  { name: '--ink', use: 'Main text' },
  { name: '--ink-2', use: 'Secondary text' },
  { name: '--ink-3', use: 'Labels, notes' },
  { name: '--ink-mute', use: 'Separators, credits' },
  { name: '--accent', use: 'Links, highlights' },
  { name: '--accent-deep', use: 'Nav bar, link hover' },
  { name: '--positive', use: 'Higher in the House bill' },
  { name: '--negative', use: 'Lower in the House bill' },
  { name: '--neutral', use: 'Status dot: different stretch of road' },
  { name: '--rule', use: 'Borders, dividers' },
  { name: '--rule-soft', use: 'Row borders' },
  { name: '--accent-soft', use: 'Selected tile, help band' },
  { name: '--paper-2', use: 'Hover, footer' },
  { name: '--paper-3', use: 'Code, photo placeholder' },
  { name: '--paper', use: 'Page background' },
];

function Verdict({ ratio, need }: { ratio: number; need: number }) {
  const ok = ratio >= need;
  return (
    <span style={{ fontWeight: 600, color: ok ? 'var(--positive)' : 'var(--negative)' }}>
      {ok ? 'Pass' : 'Fail'}
    </span>
  );
}

function Swatch({ name, use, paper }: { name: string; use: string; paper: string }) {
  const [ref, value] = useResolved(name);
  const ratio = value && paper ? contrast(value, paper) : 0;
  return (
    <tr>
      <td>
        <span ref={ref} style={{ color: `var(${name})`, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 28, height: 28, background: `var(${name})`, border: '1px solid var(--rule)' }} aria-hidden="true" />
          <span style={{ fontWeight: 600 }}>Aa ₱3.14B</span>
        </span>
      </td>
      <td><code>{name}</code></td>
      <td>{use}</td>
      <td className="num">{ratio ? `${ratio.toFixed(2)}:1` : '…'}</td>
      <td>{ratio ? <Verdict ratio={ratio} need={4.5} /> : null}</td>
      <td>{ratio ? <Verdict ratio={ratio} need={3} /> : null}</td>
    </tr>
  );
}

function ColourTable() {
  const [paperRef, paper] = useResolved('--paper');
  return (
    <div>
      <span ref={paperRef} style={{ color: 'var(--paper)' }} aria-hidden="true" />
      <p style={{ maxWidth: 720 }}>
        Contrast is measured against the page background (<code>--paper</code>). Text needs 4.5:1. Borders, icons
        and anything a reader must see to understand the page need 3:1.
      </p>
      <table className="amounts" style={{ maxWidth: 980 }}>
        <thead>
          <tr>
            <th>Sample</th>
            <th>Token</th>
            <th>Used for</th>
            <th>On white</th>
            <th>As text (4.5)</th>
            <th>As a mark (3)</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS.map((t) => <Swatch key={t.name} {...t} paper={paper} />)}
        </tbody>
      </table>
    </div>
  );
}

export const Colours: StoryObj = { render: () => <ColourTable /> };

const TEXT: { cls: string; where: string; sample: string; tag?: 'h1' | 'h2' | 'p' | 'span' }[] = [
  { cls: 'page-head h1', where: 'Page title (h1)', sample: '168 projects for Caloocan in the 2027 budget', tag: 'h1' },
  { cls: 'section-h', where: 'Section heading', sample: 'What the House bill did to them', tag: 'h2' },
  { cls: 'lede', where: 'Page introduction', sample: 'The NEP lists 120 of them, for ₱2.56B; the House bill lists 143, for ₱3.14B.' },
  { cls: '', where: 'Body text', sample: 'Construction of Multi-Purpose Building, Natividad Subdivision Phase 4, Barangay 168' },
  { cls: 'project-meta', where: 'Project details under a title', sample: 'Metro Manila 3rd DEO · NCR' },
  { cls: 'fine', where: 'Fine print', sample: 'Amounts are in pesos, as each document publishes them.' },
  { cls: 'stat', where: 'Big figure', sample: '₱3.14B' },
  { cls: 'stat-sub', where: 'Under a big figure', sample: '143 projects · compared with the NEP, not added' },
  { cls: 'eyebrow', where: 'Above a page title', sample: 'FY 2027 · NEP and House Bill 10858' },
  { cls: 'label', where: 'Labels (filters, columns)', sample: 'House bill' },
  { cls: 'tag', where: 'Tags', sample: 'names Caloocan City', tag: 'span' },
  { cls: 'footer-source', where: 'Footer source line', sample: 'Source: NEP FY 2027 and House Bill 10858' },
];

function TextRow({ cls, where, sample, tag = 'p' }: (typeof TEXT)[number]) {
  const ref = useRef<HTMLElement>(null);
  const [size, setSize] = useState('');
  useLayoutEffect(() => {
    if (!ref.current) return;
    const s = getComputedStyle(ref.current);
    setSize(`${Math.round(parseFloat(s.fontSize) * 10) / 10}px · ${s.fontWeight} · ${s.fontFamily.split(',')[0].replace(/"/g, '')}`);
  }, []);
  const Tag = tag;
  const sampleEl = cls === 'page-head h1'
    ? <div className="page-head" style={{ margin: 0 }}><h1 ref={ref as Ref<HTMLHeadingElement>}>{sample}</h1></div>
    : <Tag ref={ref as Ref<never>} className={cls || undefined} style={{ margin: 0 }}>{sample}</Tag>;
  const px = parseFloat(size);
  return (
    <tr>
      <td style={{ width: '55%' }}>{sampleEl}</td>
      <td>{where}<br /><code>{cls ? `.${cls}` : 'body'}</code></td>
      <td className="num" style={{ color: px && px < 14 ? 'var(--negative)' : undefined }}>{size}</td>
    </tr>
  );
}

export const Type: StoryObj = {
  render: () => (
    <div>
      <p style={{ maxWidth: 720 }}>
        Each sample uses the site's own class. Sizes under 14px are shown in red: they are hard to read for many
        people, especially on a phone or with older eyes.
      </p>
      <table className="amounts">
        <thead>
          <tr><th>Sample</th><th>Where</th><th>Renders at</th></tr>
        </thead>
        <tbody>
          {TEXT.map((t) => <TextRow key={t.where} {...t} />)}
        </tbody>
      </table>
    </div>
  ),
};
