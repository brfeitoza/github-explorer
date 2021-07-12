import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CardRepository } from '.';
import { defaultRepository } from '../../__mocks__/repository-builder';

describe('CardRepository component', () => {
  it('should render repository information in the document', async () => {
    render(
      <BrowserRouter>
        <CardRepository repository={defaultRepository} />
      </BrowserRouter>,
    );

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/repositories/${defaultRepository.full_name}`,
    );
    expect(
      screen.getByAltText(defaultRepository.owner.login),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultRepository.full_name)).toBeInTheDocument();
    expect(screen.getByText(defaultRepository.description)).toBeInTheDocument();
  });
});
