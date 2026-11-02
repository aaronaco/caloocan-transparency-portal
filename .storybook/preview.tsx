import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { PortalContext } from '../src/lib/portal-context';
import { portalState } from '../src/stories/fixtures';
import '../src/styles/theme.css';
import '../src/styles/app.css';
import '../src/styles/caloocan.css';

const VIEWPORTS = {
  smallPhone: { name: 'Small phone (320)', styles: { width: '320px', height: '640px' }, type: 'mobile' },
  phone: { name: 'Phone (360)', styles: { width: '360px', height: '800px' }, type: 'mobile' },
  largePhone: { name: 'Large phone (412)', styles: { width: '412px', height: '915px' }, type: 'mobile' },
  tablet: { name: 'Tablet (768)', styles: { width: '768px', height: '1024px' }, type: 'tablet' },
  desktop: { name: 'Desktop (1280)', styles: { width: '1280px', height: '800px' }, type: 'desktop' },
};

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    a11y: { options: { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } },
    viewport: { options: VIEWPORTS },
    options: { storySort: { order: ['Foundations', 'UI', 'Portal', 'Layout'] } },
  },
  initialGlobals: { viewport: { value: 'phone', isRotated: false } },
  decorators: [
    (Story, { parameters }) => (
      <MemoryRouter initialEntries={[parameters.route ?? '/']}>
        <PortalContext.Provider value={portalState(parameters.portal)}>
          <Story />
        </PortalContext.Provider>
      </MemoryRouter>
    ),
  ],
};

export default preview;
