import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReasonTags } from '../../components/Bits';
import { sampleRows } from '../fixtures';

const meta: Meta<typeof ReasonTags> = {
  title: 'Portal/Reason tags',
  component: ReasonTags,
  parameters: {
    docs: {
      description: {
        component:
          'Why a project is in this portal (`ReasonTags` in components/Bits.tsx): it is listed under the DPWH office, ' +
          'its title names Caloocan, or both.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ReasonTags>;

export const NamesThePlace: Story = { args: { reasons: sampleRows.houseOnly.reasons } };

export const OfficeAndPlace: Story = { args: { reasons: sampleRows.decreased.reasons } };
