import { render, screen, waitFor } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';

import { Email } from '@styled-icons/material-outlined';
import { AddShoppingCart } from '@styled-icons/material-outlined/AddShoppingCart';

import TextField from '.';

describe('<TextField />', () => {
  it('Vai testar se o TextField renderiza com uma label caso seja passado a prop label', () => {
    render(<TextField label="Label" name="Label" />);

    expect(screen.getByLabelText('Label')).toBeInTheDocument();
  });

  it('Isso vai testar se a renderização com erro esta funcionando com a prop error', () => {
    render(
      <TextField
        icon={<AddShoppingCart data-testid="icon" />}
        label="TextField"
        error="Error message"
      />,
    );
  });

  it('Vai testar se o TextField renderiza sem a label, caso a prop label não seja passada', () => {
    render(<TextField />);

    expect(screen.queryByLabelText('Label')).not.toBeInTheDocument();
  });

  it('Vai testar se o TextField renderiza com um placeholder, caso seja passada a prop placeholder', () => {
    render(<TextField placeholder="hey you" />);

    expect(screen.getByPlaceholderText('hey you')).toBeInTheDocument();
  });

  it('Vai testar se o TextField muda o valor dele enquanto o usuario digita', async () => {
    const onInput = jest.fn();

    render(<TextField onInput={onInput} label="TextField" name="TextField" />);

    const input = screen.getByRole('textbox');
    const text = 'This is my new text';

    // Fazendo com que tenha um texto no input
    userEvent.type(input, text);

    // Testando a chamada nesse input
    // Se usa waitFor por conta que esta esperando os estados mudarem, e esta verificando chamada de função
    await waitFor(() => {
      expect(input).toHaveValue(text);
      expect(onInput).toHaveBeenCalledTimes(text.length);
    });

    expect(onInput).toHaveBeenCalledWith(text);
  });

  it('Vai testar se o LabelText é acessivel pelo TAB', () => {
    render(<TextField label="TextField" name="TextField" />);

    const input = screen.getByLabelText('TextField');
    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(input).toHaveFocus();
  });

  it('Vai testar a renderização do icone ao lado do LabelText caso seja passada a prop icon', () => {
    render(<TextField icon={<Email data-testid="icon" />} />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('Renders with Icon on the right side', () => {
    render(<TextField icon={<Email data-testid="icon" />} iconPosition="right" />);

    expect(screen.getByTestId('icon').parentElement).toHaveStyle({ order: 1 });
  });

  it('Vai testar se o TextArea fica indigitavel caso seja passada a prop disabled', async () => {
    const onInput = jest.fn();

    render(<TextField onInput={onInput} label="TextField" name="TextField" disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();

    const text = 'This is my new text';

    // Colocando o texto dentro do input
    userEvent.type(input, text);

    // Vai verificar se fica indigitavel caso esteja desativado
    // Se usa waitFor por conta que esta esperando os estados mudarem, e esta verificando chamada de função
    await waitFor(() => {
      expect(input).not.toHaveValue(text);
    });
    expect(onInput).not.toHaveBeenCalled();
  });

  it('Vai testar se com o TextField desabilitado, o TAB não funciona', () => {
    render(<TextField label="TextField" name="TextField" disabled />);

    const input = screen.getByLabelText('TextField');
    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(input).not.toHaveFocus();
  });
});
