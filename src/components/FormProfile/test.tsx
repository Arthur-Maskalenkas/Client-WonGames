import { render, screen } from 'utils/test-utils';

import FormProfile from '.';

describe('<FormProfile />', () => {
  it('vai renderizar o componente', () => {
    render(<FormProfile />);

    expect(screen.getByRole('heading', { name: /my profile/i })).toBeInTheDocument();

    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /e-mail/i })).toBeInTheDocument();

    expect(screen.getByRole('textbox', { name: /Password/i })).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/new password/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });
});
