import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from 'utils/tests/helpers';

import Dropdown, { DropdownProps } from '.';

const props: DropdownProps = { title: 'um titulo', children: 'um filho' };

describe('<Dropdown />', () => {
  it('vai renderizar o componente', () => {
    renderWithTheme(<Dropdown {...props} />);

    expect(screen.getByText(/um titulo/i));
  });

  it('vai abrir e fechar o dropdown quando clica no titulo', () => {
    renderWithTheme(<Dropdown {...props} />);

    const dropdownElement = screen.getByLabelText(/dropdown/i);

    // Verifica se o drop esta escondido
    expect(dropdownElement.getAttribute('aria-hidden')).toBe('true');
    expect(dropdownElement).toHaveStyle({ opacity: 0 });

    // Verifica se caso clicar no titulo o dropdown é aberto
    userEvent.click(screen.getByText(/um titulo/i));
    expect(dropdownElement.getAttribute('aria-hidden')).toBe('false');
    expect(dropdownElement).toHaveStyle({ opacity: 1 });

    // Verifica se caso eu clique no titulo novamente o dropdown é fechado
    userEvent.click(screen.getByText(/um titulo/i));
    expect(dropdownElement.getAttribute('aria-hidden')).toBe('true');
    expect(dropdownElement).toHaveStyle({ opacity: 0 });
  });

  it('vai abrir um overlay ao clicar no dropdown', () => {
    renderWithTheme(<Dropdown {...props} />);

    const dropdownElement = screen.getByText(/um titulo/i);
    const overlay = screen.getByTestId('overlay');

    // Verifica se o overlay esta desativado
    expect(overlay).toHaveStyle({ opacity: '0' });
    expect(overlay.getAttribute('aria-hidden')).toBe('true');

    // Clica no dropdown
    userEvent.click(dropdownElement);

    // Verifica se o overlay esta ativado
    expect(overlay).toHaveStyle({ opacity: '1' });
    expect(overlay.getAttribute('aria-hidden')).toBe('false');

    // Clica no botão de fechar o dropdown
    userEvent.click(dropdownElement);

    // Verifica se o dropdown esta desativado
    expect(overlay).toHaveStyle({ opacity: '0' });
    expect(overlay.getAttribute('aria-hidden')).toBe('true');
  });
});
