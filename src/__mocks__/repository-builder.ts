import { Repository } from '../@types/global';

export function repositoryBuilder(props = {}): Repository {
  return {
    full_name: 'facebook/react',
    description:
      'declarative, efficient, and flexible JavaScript library for building user interfaces.',
    owner: {
      login: 'facebook',
      avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
    },
    stargazers_count: 171127,
    forks_count: 34597,
    open_issues_count: 768,
    ...props,
  };
}

export const defaultRepository = repositoryBuilder();
