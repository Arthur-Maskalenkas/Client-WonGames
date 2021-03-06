import styled, { css } from 'styled-components';

// Conforme o conteudo de wrapper vai crescendo, o <content> por ser absoluto e width: 0; ele vai acompnahando tbm

const wrapperModifiers = {
  open: () => css`
    opacity: 1;
    pointer-events: auto;
    /* Falando que quando estiver aberto, ele volta a posição original */
    transform: translateY(0);
  `,
  close: () => css`
    opacity: 0;
    pointer-events: none;
    /* Falando que quando estiver fechado, ele vai estar 2rem para baixo */
    transform: translateY(-2rem);
  `,
};

type WrapperProps = {
  isOpen?: boolean;
};

export const Wrapper = styled.main<WrapperProps>`
  ${({ theme, isOpen }) => css`
    position: relative;
    width: max-content;

    ${Content}, ${Overlay} {
      /* Auxiliando a transformação da propriedade transform */
      transition: transform 0.2s ease-in, opacity ${theme.transition.default};

      ${isOpen && wrapperModifiers.open()}
      ${!isOpen && wrapperModifiers.close()}
    }
  `}
`;

export const Overlay = styled.div`
  ${({ theme }) => css`
    /* Opacidade com 0.5 */
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    inset: 0 0 0 0;
    z-index: ${theme.layers.overlay};
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    color: ${theme.colors.white};
    position: relative;
    display: flex;
    align-items: center;
    padding-right: 2.4rem;
    /* Sempre acima do overlay */
    z-index: ${theme.layers.alwaysOnTop};
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    margin-top: ${theme.spacings.small};
    position: absolute;
    right: 0;
    z-index: ${theme.layers.alwaysOnTop};

    /* Setinha */
    &::before {
      content: '';
      position: absolute;
      border-right: 1.2rem solid transparent;
      border-left: 1.2rem solid transparent;
      border-bottom: 1.2rem solid ${theme.colors.white};
      top: -1.2rem;
      right: 2.4rem;
    }
  `}
`;
