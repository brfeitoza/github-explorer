import { FiChevronRight } from 'react-icons/fi';
import { Repository } from '../../@types/global';
import * as S from './styles';

interface CardRepositoryProps {
  repository: Repository;
}

export function CardRepository({ repository }: CardRepositoryProps) {
  return (
    <S.Container
      key={repository.full_name}
      to={`/repositories/${repository.full_name}`}
    >
      <img src={repository.owner.avatar_url} alt={repository.owner.login} />

      <div>
        <strong>{repository.full_name}</strong>
        <p>{repository.description}</p>
      </div>

      <FiChevronRight size={20} />
    </S.Container>
  );
}
