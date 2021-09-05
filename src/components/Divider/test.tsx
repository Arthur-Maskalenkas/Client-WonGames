import { render } from 'utils/test-utils';

import { Divider } from '.';

describe('<Divider />', () => {
  it('should render correctly', () => {
    const { container } = render(<Divider />);

    expect(container).toMatchSnapshot();
  });
});
