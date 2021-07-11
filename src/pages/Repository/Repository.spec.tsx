import { render, screen, waitFor } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { BrowserRouter } from 'react-router-dom';

import { defaultRepository } from '../../__mocks__/repository-builder';
import { defaultIssueList } from '../../__mocks__/issue-list-builder';
import api from '../../services/api';
import { Repository as RepositoryData, Issue } from './types';

import { Repository } from '.';

jest.mock('../../services/api');

async function setup(props = {}) {
  const defaultProps = {
    repository: defaultRepository,
    issueList: defaultIssueList,
    mockError: false,
    ...props,
  };

  const expectedActions = [
    { data: defaultProps.repository },
    { data: defaultProps.issueList },
  ];

  const asyncCall = async (index: number) => {
    const apiGetMocked = mocked(api.get);

    if (!defaultProps.mockError) {
      apiGetMocked.mockResolvedValueOnce({
        data: !index ? defaultProps.repository : defaultProps.issueList,
      });
    } else {
      apiGetMocked.mockImplementationOnce(() => {
        throw new Error();
      });
    }

    return expectedActions[index];
  };

  const apiResponse = (await Promise.all([asyncCall(0), asyncCall(1)])) as [
    {
      data: RepositoryData;
    },
    {
      data: Issue[];
    },
  ];

  render(
    <BrowserRouter>
      <Repository />
    </BrowserRouter>,
  );

  return {
    apiResponse,
  };
}

describe('Repository page', () => {
  it('should display the repository information correctly', async () => {
    const { apiResponse } = await setup();

    const repository = apiResponse[0];

    await waitFor(() => {
      expect(screen.getByText(repository.data.full_name)).toBeInTheDocument();
      expect(screen.getByText(repository.data.description)).toBeInTheDocument();
      expect(
        screen.getByText(repository.data.stargazers_count),
      ).toBeInTheDocument();
      expect(screen.getByText(repository.data.forks_count)).toBeInTheDocument();
      expect(
        screen.getByText(repository.data.open_issues_count),
      ).toBeInTheDocument();
    });
  });

  it('should list the issues with the correct information if greater than zero', async () => {
    const { apiResponse } = await setup();

    const issueList = apiResponse[1];

    await waitFor(() => {
      const issue1 = issueList.data[0];
      const issue2 = issueList.data[1];

      const issueByTitle1 = screen.getByTestId(issue1.title);

      expect(issueByTitle1).toBeInTheDocument();
      expect(issueByTitle1).toHaveAttribute('href', issue1.html_url);
      expect(screen.getByText(issue1.user.login)).toBeInTheDocument();

      const issueByTitle2 = screen.getByTestId(issue2.title);

      expect(issueByTitle2).toBeInTheDocument();
      expect(issueByTitle2).toHaveAttribute('href', issue2.html_url);
      expect(screen.getByText(issue2.user.login)).toBeInTheDocument();
    });
  });

  it('should display the error message if the request fails', async () => {
    await setup({ mockError: true });

    await waitFor(() => {
      expect(
        screen.getByText('Falha ao obter os dados do repositório.'),
      ).toBeInTheDocument();
    });
  });

  it('should have the attribute "target" with value "_blank" in the issue link', async () => {
    const { apiResponse } = await setup();

    const issueList = apiResponse[1];

    await waitFor(() => {
      const issue = issueList.data[0];

      const issueByTitle = screen.getByTestId(issue.title);

      expect(issueByTitle).toHaveAttribute('target', '_blank');
      expect(issueByTitle).toHaveAttribute('rel', 'noreferrer');
    });
  });
});
