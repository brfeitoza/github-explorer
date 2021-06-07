import { Repository } from '../pages/Dashboard/types';

export function repositoryBuilder(props = {}): Repository {
  return {
    full_name: 'facebook/react',
    description:
      'declarative, efficient, and flexible JavaScript library for building user interfaces.',
    owner: {
      login: 'facebook',
      avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
    },
    ...props,
  };
}

export const defaultRepository = repositoryBuilder();
