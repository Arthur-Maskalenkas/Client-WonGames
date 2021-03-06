import { useState } from 'react';
import * as S from './styles';

export type DropdownProps = {
  title: React.ReactNode;
  children: React.ReactNode;
};

const Dropdown = ({ title, children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.Wrapper isOpen={isOpen}>
      <S.Overlay
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(!isOpen)}
        data-testid="overlay"
      />
      <S.Title onClick={() => setIsOpen(!isOpen)}>{title}</S.Title>

      <S.Content aria-hidden={!isOpen} aria-label="dropdown">
        {children}
      </S.Content>
    </S.Wrapper>
  );
};

export default Dropdown;
