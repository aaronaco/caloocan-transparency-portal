import type { Meta, StoryObj } from '@storybook/react-vite';
import { php, phpDelta, phpFull } from '../../lib/format';
import { sampleRows } from '../fixtures';

const meta: Meta = {
  title: 'UI/Table',
  parameters: {
    docs: {
      description: {
        component:
          'Two kinds. The list (`.table`, `.tr`) is a grid of rows that turns into one card per row on a phone; ' +
          'the project list, the About page queries and the 2020–2026 programs use it. ' +
          'The key-value table (`.amounts`) is a real `<table>`, used for the amounts on a project page. ' +
          '`.details` is a list of labelled facts.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const rows = [sampleRows.houseOnly, sampleRows.nepOnly, sampleRows.unchanged, sampleRows.decreased];

export const List: Story = {
  render: () => (
    <div className="table" role="table" aria-label="Projects">
      <div className="tr th" role="row">
        <span role="columnheader">Project</span>
        <span role="columnheader">Status</span>
        <span role="columnheader" className="r">NEP</span>
        <span role="columnheader" className="r">House bill</span>
        <span role="columnheader" className="r">Change</span>
      </div>
      {rows.map((p) => (
        <div className="tr" role="row" key={p.key}>
          <span role="cell" className="td-project">
            <a href="#project" className="project-title">{p.title}</a>
            <span className="project-meta"><span className="label">DPWH</span><span>{p.office}</span></span>
          </span>
          <span role="cell" className="td-status">{p.status_label}</span>
          <span role="cell" className="r num" data-label="NEP">{php(p.nep_php)}</span>
          <span role="cell" className="r num strong" data-label="House bill">{php(p.house_php)}</span>
          <span
            role="cell"
            className={`r num delta ${(p.delta_php ?? 0) > 0 ? 'up' : (p.delta_php ?? 0) < 0 ? 'down' : ''}`}
            data-label="Change"
          >
            {phpDelta(p.delta_php)}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const KeyValue: Story = {
  render: () => {
    const p = sampleRows.decreased;
    return (
      <table className="amounts" style={{ maxWidth: 640 }}>
        <tbody>
          <tr><th scope="row">NEP</th><td className="num r">{phpFull(p.nep_php)}</td><td className="r">Page {p.nep_page}</td></tr>
          <tr><th scope="row">House bill, 3rd reading</th><td className="num r">{phpFull(p.hgab3_php)}</td><td className="r">Page {p.hgab3_page}</td></tr>
          <tr className="amounts-total">
            <th scope="row">Change, House bill against the NEP</th>
            <td className="num r">{phpDelta(p.delta_php)}</td>
            <td />
          </tr>
        </tbody>
      </table>
    );
  },
};

export const Details: Story = {
  render: () => {
    const p = sampleRows.decreased;
    return (
      <dl className="details" style={{ maxWidth: 340 }}>
        <div><dt className="label">Program line</dt><dd>{p.program}</dd></div>
        <div><dt className="label">Sub-line</dt><dd>{p.pap}</dd></div>
        <div><dt className="label">DPWH office</dt><dd>{p.office}</dd></div>
      </dl>
    );
  },
};
