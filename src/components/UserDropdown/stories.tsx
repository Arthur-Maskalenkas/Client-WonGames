import { Story, Meta } from '@storybook/react/types-6-0';
import UserDropdown, { UserDropdownProps } from '.';

import {
  AccountCircle,
  FavoriteBorder,
  ExitToApp,
} from '@styled-icons/material-outlined';
import { ChevronDown } from '@styled-icons/boxicons-regular/ChevronDown';

export default {
  title: 'UserDropdown',
  component: UserDropdown,
  parameters: {
    backgrounds: {
      default: 'won-dark',
    },
  },
} as Meta;

export const Default: Story<UserDropdownProps> = (args) => (
  <div style={{ maxWidth: '98%', display: 'flex', justifyContent: 'flex-end' }}>
    <UserDropdown {...args} />
  </div>
);

Default.args = {
  username: 'Arthur',
};
