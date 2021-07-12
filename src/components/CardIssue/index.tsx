import { FiChevronRight } from 'react-icons/fi';
import { Issue } from '../../@types/global';

interface CardIssueProps {
  issue: Issue;
}

export function CardIssue({ issue }: CardIssueProps) {
  return (
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
  );
}
