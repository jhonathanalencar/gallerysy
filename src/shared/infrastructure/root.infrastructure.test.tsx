import { render, screen } from '@testing-library/react';

import { RootInfrastructure } from './root.infrastructure';

jest.mock('@clerk/nextjs', () => ({
  ...jest.requireActual('@clerk/nextjs'),
  ClerkProvider: jest.fn(({ children }) => <>{children}</>),
}));

describe('<RootInfrastructure>', () => {
  describe('Render', () => {
    it('should render children prop when it is provided', () => {
      const children = <div>Mikasa</div>;
      render(<RootInfrastructure>{children}</RootInfrastructure>);

      const text = screen.getByText(/mikasa/i);

      expect(text).toBeInTheDocument();
    });

    it('should render nothing when children prop is null', () => {
      const { container } = render(
        <RootInfrastructure>{null}</RootInfrastructure>
      );

      expect(container).toBeEmptyDOMElement();
    });
  });
});
