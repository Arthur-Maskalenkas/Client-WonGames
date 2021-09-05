import { Story, Meta } from '@storybook/react/types-6-0';
import CartIcon from '.';

export default {
  title: 'CartIcon',
  component: CartIcon,
  parameters: {
    backgrounds: {
      default: 'won-dark',
    },
  },
} as Meta;

export const Default: Story = () => <CartIcon />;
export const withItems: Story = (args) => <CartIcon {...args} />;

withItems.args = {
  quantity: 6,
};

// Especifico, para não mudar
// withItems.args = {
//   cartContextValue: {
//     quantity: 6,
//   },
// };
