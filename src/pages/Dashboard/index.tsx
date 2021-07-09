import { FormEvent, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Logo } from '../../components/Logo';
import api from '../../services/api';
import { Repository } from './types';

import { Title, Form, Repositories, Error } from './styles';

export function Dashboard(): JSX.Element {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (!storagedRepositories) {
      return [];
    }

    return JSON.parse(storagedRepositories);
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(event: FormEvent): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError(
        'Por favor, informe um repositório. Utilize o formato "usuário/repositório".',
      );
      return;
    }

    const hasRepositoryAlreadyAdded = repositories.some(
      repository => repository.full_name === newRepo,
    );

    if (hasRepositoryAlreadyAdded) {
      setInputError('O repositório informado já foi adicionado.');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError(
        'Repositório não encontrado. Utilize o formato "usuário/repositório" para adicionar um repositório.',
      );
    }
  }

  return (
    <>
      <Logo />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
}
