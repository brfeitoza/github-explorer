import { FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import * as S from './styles';

interface HeaderProps {
  showGoBackButton?: boolean;
}

export function Header({ showGoBackButton = false }: HeaderProps) {
  return (
    <S.Container>
      <Logo />
      {showGoBackButton && (
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      )}
    </S.Container>
  );
}
