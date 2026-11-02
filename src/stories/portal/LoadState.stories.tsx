import type { Meta, StoryObj } from '@storybook/react-vite';
import { Await } from '../../components/Bits';

const meta: Meta = {
  title: 'Portal/Load state',
  parameters: {
    docs: {
      description: {
        component:
          'What a page shows while it waits for the Budget API, and when the API fails (`Await` in components/Bits.tsx). ' +
          '"Try again" makes a fresh set of requests.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Loading: Story = {
  render: () => <Await state={{ status: 'loading' }} what="projects">{() => null}</Await>,
};

export const Failed: Story = {
  render: () => (
    <Await state={{ status: 'error', error: new Error('The Budget API answered 503.') }} what="projects">
      {() => null}
    </Await>
  ),
};
