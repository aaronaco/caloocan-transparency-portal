import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageHead } from '../../components/Chrome';

const meta: Meta<typeof PageHead> = {
  title: 'Layout/Page header',
  component: PageHead,
  parameters: {
    docs: {
      description: {
        component: 'The top of a page (`PageHead` in components/Chrome.tsx): a short label, the title, and an introduction.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof PageHead>;

export const ProjectList: Story = {
  render: () => (
    <PageHead
      eyebrow={<>FY 2027<span className="sep">·</span>NEP and House Bill 10858<span className="sep">·</span>Caloocan</>}
      title="168 projects for Caloocan in the 2027 budget"
    >
      <p>
        The NEP lists 120 of them, for ₱2.56B; the House bill lists 143, for ₱3.14B. 48 projects are in the House bill only
        and 25 in the NEP only: candidates to check, not confirmed changes.
      </p>
    </PageHead>
  ),
};
