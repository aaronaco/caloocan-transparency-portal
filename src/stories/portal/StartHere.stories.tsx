import type { Meta, StoryObj } from '@storybook/react-vite';
import StartHere from '../../components/StartHere';
import { summarise } from '../../lib/scope';
import { sampleScope } from '../fixtures';

const meta: Meta<typeof StartHere> = {
  title: 'Portal/Start here',
  component: StartHere,
  parameters: {
    docs: {
      description: {
        component:
          'The first thing on the main page (`StartHere` in components/StartHere.tsx): a search box for your barangay or street, ' +
          'and plain shortcuts to the parts of the site people look for most. Each link opens the project list with its filter set.',
      },
    },
  },
  args: { summary: summarise(sampleScope.projects) },
};
export default meta;
type Story = StoryObj<typeof StartHere>;

export const Default: Story = {};
