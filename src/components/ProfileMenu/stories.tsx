import { Story, Meta } from '@storybook/react/types-6-0';
import ProfileMenu from '.';

export default {
  title: 'ProfileMenu',
  component: ProfileMenu,
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story = (args) => <ProfileMenu {...args} />;
