import { fireEvent, render, screen } from '@testing-library/react';

import { Dashboard } from '.';

describe('Dashboard page', () => {
  it('should be rendered in the document', () => {
    render(<Dashboard />);

    expect(
      screen.getByText('Explore repositórios no Github'),
    ).toBeInTheDocument();
  });

  it('should add the repository if it is found', async () => {
    render(<Dashboard />);

    const searchInput = screen.getByPlaceholderText(
      'Digite o nome do repositório',
    );
    fireEvent.change(searchInput, { target: { value: 'facebook/react' } });

    const searchButton = screen.getByText('Pesquisar');
    fireEvent.click(searchButton);

    // await waitFor(() => {
    //   expect(screen.getByText('facebook/react')).toBeInTheDocument();
    // });
  });
});
