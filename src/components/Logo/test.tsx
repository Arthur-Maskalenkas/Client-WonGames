import { render, screen } from 'utils/test-utils';
import 'jest-styled-components';

import Logo from '.';

describe('<Logo />', () => {
  it('isso deve renderizar a logo com o id passado', () => {
    const { container } = render(<Logo id="logoId" />);

    expect(container.querySelector('#logoId'));

    expect(container.parentElement).toMatchSnapshot();
  });

  it('should render a white  label by default', () => {
    render(<Logo />);

    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
      color: '#FAFAFA',
    });
  });

  it('should render a black label when color is passed', () => {
    render(<Logo color="black" />);

    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
      color: '#030517',
    });
  });

  it('should render a bigger logo', () => {
    render(<Logo size="large" />);

    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
      width: '20rem',
    });
  });

  it('should render a normal logo when size is default', () => {
    render(<Logo size="normal" />);

    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
      width: '11rem',
    });
  });

  it('should render a bigger logo without text on mobile if hideOnMobile', () => {
    render(<Logo hideOnMobile />);

    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyleRule(
      'width',
      '5.8rem',
      {
        media: '(max-width: 768px)',
      },
    );
  });
});
