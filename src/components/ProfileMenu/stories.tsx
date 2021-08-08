import { Story, Meta } from '@storybook/react/types-6-0';
import ProfileMenu, { ProfileMenuProps } from '.';

export default {
  title: 'ProfileMenu',
  component: ProfileMenu,
  args: {},
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'won-dark',
    },
  },
  argTypes: {
    activeLink: {
      control: {
        type: 'inline-radio',
        options: ['/profile/me', '/profile/cards', '/profile/orders'],
      },
    },
  },
} as Meta;

export const Default: Story<ProfileMenuProps> = (args) => (
  <ProfileMenu {...args} />
);
