import Link from 'next/link';

import Dropdown from 'components/Dropdown';
import * as S from './styles';

import {
  AccountCircle,
  FavoriteBorder,
  ExitToApp,
} from '@styled-icons/material-outlined';
import { ChevronDown } from '@styled-icons/boxicons-regular/ChevronDown';

export type UserDropdownProps = { username: string };

const UserDropdown = ({ username }: UserDropdownProps) => (
  <Dropdown
    title={
      <>
        <AccountCircle />
        <S.Username>{username}</S.Username>
        <ChevronDown />
      </>
    }
  >
    <S.Nav>
      <Link href="/profile/me" passHref>
        <S.Link>
          <AccountCircle />
          <span>My profile</span>
        </S.Link>
      </Link>
      <Link href="/wishlist" passHref>
        <S.Link title="Wishlist">
          <FavoriteBorder />
          <span>Wishlist</span>
        </S.Link>
      </Link>

      <Link href="/logout" passHref>
        <S.Link title="Sign out">
          <ExitToApp />
          <span>Sign out</span>
        </S.Link>
      </Link>
    </S.Nav>
  </Dropdown>
);

export default UserDropdown;
