import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Header } from '.';

describe('Header component', () => {
  it('should render Github Explorer logo in the document', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByAltText('Github Explorer')).toBeInTheDocument();
  });

  it('should render the go back button if prop "showGoBackButton" is passed', async () => {
    render(
      <BrowserRouter>
        <Header showGoBackButton />
      </BrowserRouter>,
    );

    const goBackLink = screen.getByRole('link', {
      name: /voltar/i,
    });

    expect(goBackLink).toBeInTheDocument();
    expect(goBackLink).toHaveAttribute('href', '/');
  });
});
