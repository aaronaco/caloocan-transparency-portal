import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'UI/Alert',
  parameters: {
    docs: {
      description: {
        component:
          'Messages set apart from the page: a note with a side rule (`.disclaimers`), loading (`.state` with `.spinner`), ' +
          'an error with a retry (`.state-error`), and a warning box (`.config-warning`, shown only in development).',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Note: Story = {
  render: () => (
    <aside className="disclaimers" aria-label="Note">
      <p><strong>No allegations.</strong> A difference between two budget versions is a lead to check, not proof.</p>
    </aside>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="state" role="status">
      <span className="spinner" aria-hidden="true" /> Loading projects from the Budget API…
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="state state-error" role="alert">
      <p><strong>Could not load projects.</strong> The Budget API answered 503.</p>
      <button type="button" className="button">Try again</button>
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div className="page config-warning" role="alert">
      <strong>portal.config.ts needs attention</strong> (shown in development only):
      <ul><li>scope.places[0].q is empty.</li></ul>
    </div>
  ),
};
