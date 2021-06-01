import { render, screen } from '@testing-library/react';

import { Logo } from '.';

describe('Logo component', () => {
  it('should be rendered in the document', () => {
    render(<Logo />);

    expect(screen.getByAltText('Github Explorer')).toBeInTheDocument();
  });
});
