import { useId, useState, type ReactNode } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

export default function MoreFilters({ active, children }: { active: number; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`more-filters${open ? ' open' : ''}`}>
      <button
        type="button"
        className="button more-filters-toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        <SlidersHorizontal className="icon" size={20} />
        Filter and sort{active > 0 && ` (${active} on)`}
        <ChevronDown className="icon more-filters-chevron" size={20} />
      </button>
      <div id={id} className="more-filters-body">
        {children}
      </div>
    </div>
  );
}
