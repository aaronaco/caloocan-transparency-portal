import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from '../../components/Chrome';

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The "Help improve this portal" band and the footer on every page (`Footer` in components/Chrome.tsx). ' +
          'The band is left out on the About page, which has its own.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Footer>;

export const OnProjects: Story = {};

export const OnAbout: Story = { parameters: { route: '/about' } };
