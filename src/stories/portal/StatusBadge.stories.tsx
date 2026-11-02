import type { Meta, StoryObj } from '@storybook/react-vite';
import type { BridgeGroup } from '../../api/types';
import { StatusChip } from '../../components/Bits';

const STATUSES: [BridgeGroup, string][] = [
  ['house_only', 'House bill only'],
  ['nep_only', 'NEP only'],
  ['unchanged', 'Same amount in both'],
  ['increased', 'Higher in the House bill'],
  ['decreased', 'Lower in the House bill'],
  ['scope_review', 'Different stretch of the same road'],
];

const meta: Meta<typeof StatusChip> = {
  title: 'Portal/Status badge',
  component: StatusChip,
  parameters: {
    docs: {
      description: {
        component:
          'What the House bill did to a project (`StatusChip` in components/Bits.tsx): a coloured dot and the API\'s own words. ' +
          '`held` adds the unconfirmed-match badge, which shows on every such row.',
      },
    },
  },
  args: { group: 'house_only', label: 'House bill only', held: false },
  argTypes: { group: { control: 'select', options: STATUSES.map(([g]) => g) } },
};
export default meta;
type Story = StoryObj<typeof StatusChip>;

export const Playground: Story = {};

export const Every: Story = {
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
      {STATUSES.map(([g, label]) => <li key={g}><StatusChip group={g} label={label} /></li>)}
    </ul>
  ),
};

export const UnconfirmedMatch: Story = {
  args: { group: 'unchanged', label: 'Same amount in both', held: true },
};
