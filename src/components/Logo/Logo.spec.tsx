import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Logo } from '.';

describe('Logo component', () => {
  it('should be rendered in the document', () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>,
    );

    expect(screen.getByAltText('Github Explorer')).toBeInTheDocument();
  });

  it('should have the correct value in "href" attribute of the link', async () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>,
    );

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', '/');
  });
});
