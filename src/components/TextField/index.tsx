import { useState, InputHTMLAttributes } from 'react';

import * as S from './styles';

type IconPositionType = 'left' | 'right';

export type TextFieldProps = {
  onInputChange?: (value: string) => void;
  label?: string;
  initialValue?: string;
  icon?: JSX.Element;
  iconPosition?: IconPositionType;
  disabled?: boolean;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = ({
  label,
  iconPosition = 'left',
  initialValue = '',
  onInputChange,
  name,
  icon,
  disabled = false,
  error,
  ...props
}: TextFieldProps) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);

    if (onInputChange) {
      onInputChange(newValue);
    }
  };

  // É usado um input falso em volta do input real para colocar o icone e organizar tudo.
  // inputwrapper não é input, é apenas uma div com border, e e retirado a borda do input real

  return (
    <S.Wrapper disabled={disabled} error={error}>
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
      <S.InputWrapper>
        {!!icon && <S.Icon iconPosition={iconPosition}>{icon}</S.Icon>}
        <S.Input
          type="text"
          onChange={onChange}
          value={value}
          iconPosition={iconPosition}
          disabled={disabled}
          name={name}
          // Fazendo com que o id ja seja apontado automaticamente
          {...(label ? { id: name } : {})}
          {...props}
        />
      </S.InputWrapper>
      {!!error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  );
};

export default TextField;
