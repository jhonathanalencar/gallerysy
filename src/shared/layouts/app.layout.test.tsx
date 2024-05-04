import { render, screen } from '@testing-library/react';

import { AppLayout } from './app.layout';

function setup() {
  const children = <div>Mikasa</div>;
  return render(<AppLayout>{children}</AppLayout>);
}

describe('<AppLayout>', () => {
  describe('Render', () => {
    it('should render a main element', () => {
      setup();

      const main = screen.getByRole('main');

      expect(main).toBeInTheDocument();
    });

    it('should render children prop when it is provided', () => {
      setup();

      const text = screen.getByText(/mikasa/i);

      expect(text).toBeInTheDocument();
    });
  });
});
