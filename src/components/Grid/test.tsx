import { render } from 'utils/test-utils';

import { Grid } from '.';

describe('<Grid />', () => {
  it('should render correctly', () => {
    const { container } = render(<Grid>Children</Grid>);

    expect(container).toMatchSnapshot();
  });
});
