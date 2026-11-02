import type { Meta, StoryObj } from '@storybook/react-vite';

const VARIANTS = {
  primary: 'button button-primary',
  default: 'button',
  quiet: 'button button-quiet',
  link: 'link-button',
};
type Args = { variant: keyof typeof VARIANTS; label: string };

const meta: Meta<Args> = {
  title: 'UI/Button',
  parameters: {
    docs: {
      description: {
        component:
          'The `.button` classes in app.css. Primary is for the one main action in a block (Report a problem); ' +
          'default for other actions; quiet for low-key ones (Download CSV); link for an action inside a sentence (Clear filters).',
      },
    },
  },
  args: { variant: 'primary', label: 'Report a problem' },
  argTypes: { variant: { control: 'inline-radio', options: Object.keys(VARIANTS) } },
  render: ({ variant, label }) => <button type="button" className={VARIANTS[variant]}>{label}</button>,
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="help-band-actions">
      <button type="button" className="button button-primary">Report a problem</button>
      <button type="button" className="button">Show 100 more</button>
      <button type="button" className="button button-quiet">Download CSV</button>
      <button type="button" className="link-button">Clear filters</button>
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <div className="help-band-actions">
      <a className="button button-primary" href="#report">Report a problem ↗</a>
      <a className="button" href="#github">Contribute on GitHub ↗</a>
    </div>
  ),
};
