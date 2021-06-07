import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';

import {
  defaultRepository,
  repositoryBuilder,
} from '../../__mocks__/repository-builder';
import api from '../../services/api';

import { Dashboard } from '.';

jest.mock('../../services/api');

interface Setup {
  searchInput: HTMLInputElement;
  searchButton: HTMLButtonElement;
  apiGetMocked: ReturnType<typeof mocked>;
}

function setup(props = {}): Setup {
  const defaultProps = {
    repository: defaultRepository,
    mockError: false,
    ...props,
  };

  const apiGetMocked = mocked(api.get);
  if (!defaultProps.mockError) {
    apiGetMocked.mockResolvedValueOnce({
      data: defaultProps.repository,
    });
  } else {
    apiGetMocked.mockImplementationOnce(() => {
      throw new Error();
    });
  }

  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>,
  );

  const searchInput = screen.getByPlaceholderText(
    'Digite o nome do repositório',
  ) as HTMLInputElement;

  const searchButton = screen.getByText('Pesquisar') as HTMLButtonElement;

  return {
    searchInput,
    searchButton,
    apiGetMocked,
  };
}

describe('Dashboard page', () => {
  it('should be rendered in the document', () => {
    render(<Dashboard />);

    expect(
      screen.getByText('Explore repositórios no Github'),
    ).toBeInTheDocument();
  });

  it('should add the repository if it is found', async () => {
    const { searchInput, searchButton } = setup();

    fireEvent.change(searchInput, {
      target: { value: defaultRepository.full_name },
    });

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(defaultRepository.full_name)).toBeInTheDocument();
    });
  });

  it('should clear the search input after add a repository', async () => {
    const { searchInput, searchButton } = setup({
      repository: repositoryBuilder({ full_name: 'angular/angular' }),
    });

    fireEvent.change(searchInput, {
      target: { value: 'angular/angular' },
    });

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(searchInput.value).toEqual('');
    });
  });

  it('should highlight the search input border as red if some error occurs', async () => {
    const { searchInput, searchButton } = setup();

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(searchInput).toHaveStyle('border: 2px solid #c53030');
    });
  });

  it('should show the correct error message if the search input is empty', async () => {
    const { searchButton } = setup();

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(
        screen.getByText(/por favor, informe um repositório/i),
      ).toBeInTheDocument();
    });
  });

  it('should show the correct error message if the repository was not found', async () => {
    const { searchInput, searchButton } = setup({ mockError: true });

    fireEvent.change(searchInput, {
      target: { value: 'fake-repository' },
    });

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(
        screen.getByText(/repositório não encontrado/i),
      ).toBeInTheDocument();
    });
  });

  it('should show the correct error message if the repository is already added', async () => {
    const { searchInput, searchButton } = setup();

    fireEvent.change(searchInput, {
      target: { value: defaultRepository.full_name },
    });

    fireEvent.click(searchButton);

    fireEvent.change(searchInput, {
      target: { value: defaultRepository.full_name },
    });

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(
        screen.getByText(/o repositório informado já foi adicionado/i),
      ).toBeInTheDocument();
    });
  });
});
