import userEvent from '@testing-library/user-event';
import { CartContextDefaultValues } from 'hooks/use-cart';
import { render, screen } from 'utils/test-utils';

import GameItem, { GameItemProps, PaymentInfoProps } from '.';

const props = {
  id: '1',
  title: 'um titulo',
  img: 'uma imagem',
  price: 'um preco',
};

describe('<GameItem />', () => {
  it('deve renderizar a estrutura', () => {
    render(<GameItem {...props} />);

    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
      'src',
      props.img,
    );

    expect(screen.getByRole('heading', { name: props.title })).toBeInTheDocument();

    expect(screen.getByText(props.price)).toBeInTheDocument();
  });

  it('Isso deve renderizar com o link de download', () => {
    const downloadLink = 'https://link';

    render(<GameItem {...props} downloadLink={downloadLink} />);

    expect(screen.getByRole('link', { name: `Get ${props.title} here` })).toHaveAttribute(
      'href',
      downloadLink,
    );
  });

  it('Isso deve renderizar as informações de pagamento', () => {
    const paymentInfo = {
      id: '1',
      flag: 'mastercard',
      img: '/img/master-card.png',
      number: '**** **** **** 4326',
      purchaseDate: 'Purchase made on 07/20/2020 at 20:32',
    };

    render(<GameItem {...props} paymentInfo={paymentInfo} />);

    expect(screen.getByRole('img', { name: paymentInfo.flag })).toHaveAttribute(
      'src',
      paymentInfo.img,
    );

    expect(screen.getByText(paymentInfo.number)).toBeInTheDocument();
    expect(screen.getByText(paymentInfo.purchaseDate)).toBeInTheDocument();
  });

  it('Vai chamar a função de remover o jogo do carrinho quando o remove for clicado', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      isInCart: () => true,
      removeToCart: jest.fn(),
    };
    render(<GameItem {...props} />, { cartProviderProps });

    const removeLink = screen.getByText(/remove/i);
    expect(removeLink).toBeInTheDocument();

    userEvent.click(removeLink);
    expect(cartProviderProps.removeToCart).toHaveBeenCalledWith('1');
  });
});
