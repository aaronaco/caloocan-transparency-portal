import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate, type To } from 'react-router-dom';
import { count } from '../lib/format';
import type { Summary } from '../lib/scope';

export default function StartHere({ summary }: { summary: Summary }) {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const houseOnly = summary.groups.house_only.rows;
  const nepOnly = summary.groups.nep_only.rows;

  const goTo = (id: string) => requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));

  const search = (e: FormEvent) => {
    e.preventDefault();
    const words = q.trim();
    navigate({ pathname: '/', search: words ? `?${new URLSearchParams({ q: words })}` : '', hash: '#projects' });
    goTo('projects');
  };

  const links: { to: To; label: string; section?: string }[] = [
    { to: { pathname: '/', hash: '#projects' }, label: `All ${count(summary.rows)} projects`, section: 'projects' },
    { to: { pathname: '/', hash: '#offices' }, label: 'Your district and representative', section: 'offices' },
    ...(houseOnly
      ? [{ to: { pathname: '/', search: '?status=house_only', hash: '#projects' }, label: `In the House bill only (${count(houseOnly)})`, section: 'projects' }]
      : []),
    ...(nepOnly
      ? [{ to: { pathname: '/', search: '?status=nep_only', hash: '#projects' }, label: `In the NEP only (${count(nepOnly)})`, section: 'projects' }]
      : []),
    { to: '/gaa', label: 'Budgets 2020–2026' },
    { to: '/about', label: 'How to read these numbers' },
  ];

  return (
    <section className="start" aria-labelledby="start-h">
      <h2 id="start-h" className="sr-only">Start here</h2>
      <form className="start-search" role="search" onSubmit={search}>
        <label htmlFor="start-q" className="start-search-label">Find projects in your barangay or street</label>
        <div className="start-search-row">
          <input
            id="start-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. Barangay 176"
            enterKeyHint="search"
          />
          <button type="submit" className="button button-primary">Search</button>
        </div>
      </form>
      <nav aria-label="Quick links">
        <ul className="start-links">
          {links.map(({ to, label, section }) => (
            <li key={label}>
              <Link to={to} onClick={section ? () => goTo(section) : undefined}>
                <ArrowRight className="icon" size={20} />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

