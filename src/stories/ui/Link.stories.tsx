import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from 'react-router-dom';
import { External } from '../../components/Bits';

const meta: Meta = {
  title: 'UI/Link',
  parameters: {
    docs: {
      description: {
        component:
          'Links inside the site, and links out (`External` in components/Bits.tsx), which open in a new tab and end with ↗.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Internal: Story = {
  render: () => <p>Lines removed here are <Link to="/about#removed">listed on the About page</Link>.</p>,
};

export const External_: Story = {
  name: 'External',
  render: () => <p><External href="https://budget.bettergov.ph">This project on budget.bettergov.ph</External></p>,
};

export const Breadcrumb: Story = {
  render: () => <p className="crumbs"><Link to="/">← Every project</Link></p>,
};
