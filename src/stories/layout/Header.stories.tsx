import type { Meta, StoryObj } from '@storybook/react-vite';
import { Masthead } from '../../components/Chrome';

const meta: Meta<typeof Masthead> = {
  title: 'Layout/Header',
  component: Masthead,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The masthead and section nav on every page (`Masthead` in components/Chrome.tsx). The nav marks the page the reader is on.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Masthead>;

export const OnProjects: Story = {};

export const OnAbout: Story = { parameters: { route: '/about' } };
