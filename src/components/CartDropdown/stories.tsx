import { Story, Meta } from '@storybook/react/types-6-0';
import CartDropdown from '.';

import items from 'components/CartList/mock';
import { utimesSync } from 'fs';

export default {
  title: 'CartDropdown',
  component: CartDropdown,
  parameters: {
    backgrounds: {
      default: 'won-dark',
    },
  },
} as Meta;

export const Default: Story = (args) => (
  <div style={{ maxWidth: '98%', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropdown {...args} />
  </div>
);

// Vai tudo para o outro componente, sem ter que passar props!
Default.args = {
  cartContextValue: {
    items,
    quantity: items.length,
    total: 'R$ 500,00 ',
  },
};

export const Empty: Story = (args) => (
  <div style={{ maxWidth: '98%', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropdown />
  </div>
);
