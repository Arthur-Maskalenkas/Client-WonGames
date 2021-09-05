import { render } from 'utils/test-utils';
import theme from 'styles/theme';

import { Container } from '.';

describe('<Container />', () => {
  it('should render the heading', () => {
    const { debug, container } = render(<Container></Container>);

    expect(container.firstChild).toHaveStyleRule('max-width', theme.grid.container);

    expect(container.firstChild).toMatchSnapshot();
  });
});
