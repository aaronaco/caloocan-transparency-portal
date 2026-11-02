import type { Meta, StoryObj } from '@storybook/react-vite';
import { Disclaimers } from '../../components/Bits';
import { sampleDisclaimers } from '../fixtures';

const meta: Meta<typeof Disclaimers> = {
  title: 'Portal/Disclaimers',
  component: Disclaimers,
  parameters: {
    docs: {
      description: {
        component:
          'The API\'s disclaimers, printed word for word from the response (`Disclaimers` in components/Bits.tsx) on every page ' +
          'that shows figures. The project list uses the compact form.',
      },
    },
  },
  args: { items: sampleDisclaimers },
};
export default meta;
type Story = StoryObj<typeof Disclaimers>;

export const Full: Story = {};

export const Compact: Story = { args: { compact: true } };
