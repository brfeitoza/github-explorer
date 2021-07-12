import { Issue } from '../@types/global';

export function issueListBuilder(props = []): Issue[] {
  return [
    {
      html_url: 'https://github.com/facebook/react/issues/21844',
      id: 940790936,
      title: 'Strict effects and unmounted ref flag',
      user: {
        login: 'otakustay',
      },
    },
    {
      html_url: 'https://github.com/facebook/react/pull/21843',
      id: 940407600,
      title: 'Revert "Revert "Use `act()` in ReactFabric tests""',
      user: {
        login: 'sujatakhadka111',
      },
    },
    ...props,
  ];
}

export const defaultIssueList = issueListBuilder();
