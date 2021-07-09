import * as reactRouterMock from 'react-router-dom';

jest.mock('react-router-dom', () => {
  return {
    useRouteMatch: () => ({
      params: {
        repository: 'react',
      },
    }),
  };
});

export { reactRouterMock };
