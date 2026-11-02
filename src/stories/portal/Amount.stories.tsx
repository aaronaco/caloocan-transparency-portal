import type { Meta, StoryObj } from '@storybook/react-vite';
import { php, phpDelta, phpFull } from '../../lib/format';

const meta: Meta = {
  title: 'Portal/Amount',
  parameters: {
    docs: {
      description: {
        component:
          'How pesos are printed (lib/format.ts): short (`php`), exact (`phpFull`) and as a change (`phpDelta`). ' +
          'No amount prints as a dash, never as zero: it means that version has no such line.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const VALUES: [string, number | null][] = [
  ['A road project', 100_000_000],
  ['A small line', 5_000_000],
  ['A whole office', 3_090_000_000],
  ['Lower in the House bill', -5_000_000],
  ['No such line in this version', null],
  ['No change', 0],
];

export const Formats: Story = {
  render: () => (
    <table className="amounts">
      <thead>
        <tr><th>Case</th><th className="r">Short</th><th className="r">Exact</th><th className="r">As a change</th></tr>
      </thead>
      <tbody>
        {VALUES.map(([what, n]) => (
          <tr key={what}>
            <th scope="row">{what}</th>
            <td className="num r">{php(n)}</td>
            <td className="num r">{phpFull(n)}</td>
            <td className="num r">{phpDelta(n)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
