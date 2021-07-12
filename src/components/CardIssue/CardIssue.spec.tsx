import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CardIssue } from '.';
import { defaultIssueList } from '../../__mocks__/issue-list-builder';

describe('CardIssue component', () => {
  it('should render repository information in the document', async () => {
    const issue = defaultIssueList[0];

    render(
      <BrowserRouter>
        <CardIssue issue={issue} />
      </BrowserRouter>,
    );

    const issueLinkElement = screen.getByRole('link');

    expect(issueLinkElement).toHaveAttribute('href', issue.html_url);
    expect(issueLinkElement).toHaveAttribute('target', '_blank');
    expect(screen.getByText(issue.title)).toBeInTheDocument();
    expect(screen.getByText(issue.user.login)).toBeInTheDocument();
  });
});
