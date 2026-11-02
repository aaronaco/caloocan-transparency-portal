import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'UI/Stat',
  parameters: {
    docs: {
      description: {
        component: 'A row of big figures with a label above and a note below (`.stats`), at the top of the project list.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Row: Story = {
  render: () => (
    <dl className="stats">
      <div>
        <dt className="label">Projects</dt>
        <dd className="stat num">168</dd>
        <dd className="stat-sub">DPWH 161 · HFEP 7</dd>
      </div>
      <div>
        <dt className="label">NEP</dt>
        <dd className="stat num">₱2.56B</dd>
        <dd className="stat-sub">120 projects · the budget the President submits</dd>
      </div>
      <div>
        <dt className="label">House bill</dt>
        <dd className="stat num stat-accent">₱3.14B</dd>
        <dd className="stat-sub">143 projects · compared with the NEP, not added</dd>
      </div>
      <div>
        <dt className="label">In the House bill only</dt>
        <dd className="stat num">48</dd>
        <dd className="stat-sub">₱1.05B · candidates to check</dd>
      </div>
    </dl>
  ),
};
