import { render, screen } from '@testing-library/react';

import Dashboard from '.';

describe('Dashboard page', () => {
  it('should be rendered in the document', () => {
    render(<Dashboard />);

    expect(
      screen.getByText('Explore repositórios no Github'),
    ).toBeInTheDocument();
  });
});
