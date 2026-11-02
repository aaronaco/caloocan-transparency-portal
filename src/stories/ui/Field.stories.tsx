import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'UI/Field',
  parameters: {
    docs: {
      description: {
        component:
          'The `.field` classes in app.css: a label above a text input or a select. ' +
          'A `.toolbar` lines several up, as in the filters above the project list.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const TextInput: Story = {
  render: () => (
    <label className="field" style={{ maxWidth: 360 }}>
      <span className="label">Search</span>
      <input type="search" placeholder="Barangay, road, school, office…" />
    </label>
  ),
};

export const Select: Story = {
  render: () => (
    <label className="field" style={{ maxWidth: 240 }}>
      <span className="label">Sort by</span>
      <select defaultValue="house">
        <option value="house">House bill amount</option>
        <option value="nep">NEP amount</option>
        <option value="change">Size of change</option>
        <option value="title">Name</option>
      </select>
    </label>
  ),
};

export const Toolbar: Story = {
  render: () => (
    <div className="toolbar">
      <label className="field field-grow">
        <span className="label">Search</span>
        <input type="search" placeholder="Barangay, road, school, office…" />
      </label>
      <label className="field">
        <span className="label">Program</span>
        <select defaultValue="">
          <option value="">All programs</option>
          <option value="dpwh">DPWH (161)</option>
          <option value="hfep">HFEP (7)</option>
        </select>
      </label>
      <label className="field">
        <span className="label">Status</span>
        <select defaultValue="">
          <option value="">Any status</option>
          <option value="house_only">In the House bill only (48)</option>
        </select>
      </label>
    </div>
  ),
};
