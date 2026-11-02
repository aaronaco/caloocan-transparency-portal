import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'UI/Card',
  parameters: {
    docs: {
      description: {
        component:
          'Boxes that group one thing. `.ocard` (office cards) and `.hcard` (yearly charts) are bordered with a coloured top; ' +
          '`.report` is a filled panel for an action; `.build-own` is a callout with a coloured side.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Bordered: Story = {
  render: () => (
    <article className="ocard" style={{ maxWidth: 520 }}>
      <header className="ocard-head">
        <div>
          <p className="label">DPWH district engineering office · NCR</p>
          <h3>Metro Manila 3rd District Engineering Office</h3>
        </div>
        <span className="tag tier tier-B">Tier B · shared with 4 other districts, not split</span>
      </header>
      <p className="ocard-note">Named projects: 159 in the NEP, 178 in the House bill.</p>
    </article>
  ),
};

export const Panel: Story = {
  render: () => (
    <div className="report" style={{ maxWidth: 340 }}>
      <p className="label">Seen this project on the ground?</p>
      <p className="small">
        Citizen reports will go to one place for every portal, budget.bettergov.ph. Reporting is not open yet.
      </p>
    </div>
  ),
};

export const PanelWithActions: Story = {
  render: () => (
    <div className="report report-listing" style={{ maxWidth: 340 }}>
      <p className="label">Something wrong with this line here?</p>
      <p className="small">Not in Caloocan, or listed wrong on this page? Tell us and we'll fix it.</p>
      <div className="report-actions">
        <a className="button" href="#github">Report it on GitHub ↗</a>
        <a className="button" href="#email">Email us</a>
      </div>
    </div>
  ),
};

export const Callout: Story = {
  render: () => (
    <section className="build-own">
      <h2 className="section-h">Help improve this portal</h2>
      <p>Found a project that isn't Caloocan's, or one that's missing? Fixes are welcome.</p>
    </section>
  ),
};
