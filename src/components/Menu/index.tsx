import Link from 'next/link';

import { useState } from 'react';
import { Menu2 as MenuIcon } from '@styled-icons/remix-fill/Menu2';
import { ShoppingCart as ShoppingCartIcon } from '@styled-icons/material-outlined/ShoppingCart';
import { Search as SearchIcon } from '@styled-icons/material-outlined/Search';
import { Close as CloseIcon } from '@styled-icons/material-outlined/Close';

import Button from 'components/Button';
import Logo from 'components/Logo';
import MediaMatch from 'components/MediaWatch';
import * as S from './styles';
import CartDropdown from 'components/CartDropdown';
import UserDropdown from 'components/UserDropdown';

export type MenuProps = {
  username?: string;
};

const Menu = ({ username }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.Wrapper>
      <MediaMatch lessThan="medium">
        <S.IconWrapper onClick={() => setIsOpen(true)}>
          <MenuIcon aria-label="Open Menu" />
        </S.IconWrapper>
      </MediaMatch>

      <S.LogoWrapper>
        <Link href="/" passHref>
          <a>
            <Logo hideOnMobile />
          </a>
        </Link>
      </S.LogoWrapper>

      <MediaMatch greaterThan="medium">
        <S.MenuNav>
          <Link passHref href="/">
            <S.MenuLink href="#">Home</S.MenuLink>
          </Link>
          <Link href="/games" passHref>
            <S.MenuLink href="#">Explore</S.MenuLink>
          </Link>
        </S.MenuNav>
      </MediaMatch>

      <S.MenuGroup>
        <S.IconWrapper>
          <SearchIcon aria-label="Search" />
        </S.IconWrapper>

        <S.IconWrapper>
          <MediaMatch greaterThan="medium">
            <CartDropdown />
          </MediaMatch>

          <MediaMatch lessThan="medium">
            <Link href="/cart">
              <a>
                <CartDropdown />
              </a>
            </Link>
          </MediaMatch>
        </S.IconWrapper>

        <MediaMatch greaterThan="medium">
          {!username ? (
            <Link href="/sign-in" passHref>
              <Button as="a">Sign in</Button>
            </Link>
          ) : (
            <UserDropdown username={username} />
          )}
        </MediaMatch>
      </S.MenuGroup>

      <S.MenuFull aria-hidden={!isOpen} isOpen={isOpen}>
        <CloseIcon aria-label="Close Menu" onClick={() => setIsOpen(false)} />
        <S.MenuNav>
          <Link passHref href="/">
            <S.MenuLink href="#">Home</S.MenuLink>
          </Link>
          <Link href="/games" passHref>
            <S.MenuLink href="#">Explore</S.MenuLink>
          </Link>

          {!!username && (
            <>
              <Link href="/profile/me" passHref>
                <S.MenuLink href="#">My profile</S.MenuLink>
              </Link>
              <Link href="/profiles/wishlist" passHref>
                <S.MenuLink href="#">Wishlist</S.MenuLink>
              </Link>
            </>
          )}
        </S.MenuNav>

        {!username && (
          <S.RegisterBox>
            {/* Link */}
            <Link href="/sign-in" passHref>
              <Button fullWidth size="large" as="a">
                Sign in
              </Button>
            </Link>
            <span>or</span>

            {/* Link */}
            <Link href="/sign-up" passHref>
              <S.CreateAccount title="Sign Up">Sign Up</S.CreateAccount>
            </Link>
          </S.RegisterBox>
        )}
      </S.MenuFull>
    </S.Wrapper>
  );
};

export default Menu;
