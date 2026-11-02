import type { Meta, StoryObj } from '@storybook/react-vite';

const VARIANTS = {
  default: 'tag',
  office: 'tag tag-office',
  place: 'tag tag-place',
  warning: 'tag tag-warn',
};
type Args = { variant: keyof typeof VARIANTS; label: string };

const meta: Meta<Args> = {
  title: 'UI/Badge',
  parameters: {
    docs: {
      description: {
        component:
          'The `.tag` classes in app.css: short labels next to a project, such as why it is listed or an unconfirmed match. ' +
          'The `.tier` form wraps for longer notes on office cards.',
      },
    },
  },
  args: { variant: 'office', label: 'DPWH office' },
  argTypes: { variant: { control: 'inline-radio', options: Object.keys(VARIANTS) } },
  render: ({ variant, label }) => <span className={VARIANTS[variant]}>{label}</span>,
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="reasons">
      <span className="tag">default</span>
      <span className="tag tag-office">DPWH office</span>
      <span className="tag tag-place">names Caloocan City</span>
      <span className="tag tag-warn">unconfirmed match</span>
    </div>
  ),
};

export const Long: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <span className="tag tier tier-A">Tier A · serves one district</span>
      <span className="tag tier tier-B">Tier B · shared with 4 other districts, not split</span>
    </div>
  ),
};
