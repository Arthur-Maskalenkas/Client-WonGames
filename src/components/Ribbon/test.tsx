import { render, screen } from 'utils/test-utils';

import Ribbon from '.';

describe('<Ribbon />', () => {
  it('should render the text correctly', () => {
    render(<Ribbon>Best Seller</Ribbon>);

    expect(screen.getByText(/Best seller/i)).toBeInTheDocument();
  });

  it('should render with the primary color', () => {
    render(<Ribbon>Best seller</Ribbon>);

    expect(screen.getByText(/Best seller/i)).toHaveStyle({
      backgroundColor: '#F231A5',
    });
  });

  it('render with another color if passed', () => {
    render(<Ribbon color="secondary">Best seller</Ribbon>);

    expect(screen.getByText(/best seller/i)).toHaveStyle({
      backgroundColor: '#3CD3C1',
    });
  });

  it('should render with the normal size as default', () => {
    render(<Ribbon>Best seller</Ribbon>);

    expect(screen.getByText(/best seller/i)).toHaveStyle({
      height: '3.6rem',
      fontSize: '1.4rem',
    });
  });

  it('should render with the small size', () => {
    render(<Ribbon size="small">Best seller</Ribbon>);

    expect(screen.getByText(/best seller/i)).toHaveStyle({
      height: '2.6rem',
      fontSize: '1.2rem',
    });
  });
});
