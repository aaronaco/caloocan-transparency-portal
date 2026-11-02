import type { Meta, StoryObj } from '@storybook/react-vite';
import MoreFilters from '../../components/MoreFilters';

const meta: Meta<typeof MoreFilters> = {
  title: 'Portal/Filter and sort',
  component: MoreFilters,
  parameters: {
    docs: {
      description: {
        component:
          'The project list\'s filters (`MoreFilters` in components/MoreFilters.tsx). On a phone they fold behind one button, ' +
          'so results show right under the search; on wider screens the button is hidden and the fields sit in the toolbar.',
      },
    },
  },
  args: { active: 1 },
  render: (args) => (
    <div className="toolbar">
      <label className="field field-grow">
        <span className="label">Search</span>
        <input type="search" placeholder="Barangay, road, school, office…" />
      </label>
      <MoreFilters {...args}>
        <label className="field">
          <span className="label">Program</span>
          <select defaultValue="">
            <option value="">All programs</option>
          </select>
        </label>
        <label className="field">
          <span className="label">Status</span>
          <select defaultValue="house_only">
            <option value="">Any status</option>
            <option value="house_only">In the House bill only (47)</option>
          </select>
        </label>
        <label className="field">
          <span className="label">Sort by</span>
          <select defaultValue="house">
            <option value="house">House bill amount</option>
          </select>
        </label>
      </MoreFilters>
    </div>
  ),
};
export default meta;
type Story = StoryObj<typeof MoreFilters>;

export const OneFilterOn: Story = {};

export const NoneOn: Story = { args: { active: 0 } };
