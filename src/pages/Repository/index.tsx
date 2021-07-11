import { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useRouteMatch } from 'react-router-dom';
import { Header } from '../../components/Header';
import api from '../../services/api';
import * as S from './styles';
import { Issue, Repository as RepositoryData, RepositoryParams } from './types';

export function Repository() {
  const [repository, setRepository] = useState<RepositoryData | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState('');

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    async function loadData() {
      try {
        const [{ data: repositoryData }, { data: issuesData }] =
          await Promise.all([
            api.get(`repos/${params.repository}`),
            api.get(`repos/${params.repository}/issues`),
          ]);

        setRepository(repositoryData);
        setIssues(issuesData);
        setError('');
      } catch (err) {
        setError('Falha ao obter os dados do repositório.');
      }
    }

    loadData();
  }, [params.repository]);

  return (
    <>
      <Header showGoBackButton />

      {repository && (
        <S.RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </S.RepositoryInfo>
      )}

      {error && <S.Error>{error}</S.Error>}

      <S.Issues>
        {issues.map(issue => (
          <a
            data-testid={issue.title}
            key={issue.id}
            href={issue.html_url}
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </S.Issues>
    </>
  );
}
