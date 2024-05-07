import { render, screen } from '@testing-library/react';

import { Skeleton } from './skeleton.component';

describe('<Skeleton>', () => {
  describe('Render', () => {
    it('should render a div element with role "status"', () => {
      render(<Skeleton />);

      const div = screen.getByRole('status');

      expect(div).toBeInTheDocument();
    });

    it('should apply the "animate-shimmer" and "bg-shimmer" classes to the div element', () => {
      render(<Skeleton />);

      const div = screen.getByRole('status');

      expect(div).toHaveClass('animate-shimmer bg-shimmer');
    });

    it('should allow for an optional className prop to be passed in and merged with the existing classes', () => {
      render(<Skeleton className="h-6 w-6" />);

      const div = screen.getByRole('status');

      expect(div).toHaveClass('animate-shimmer bg-shimmer h-6 w-6');
    });
  });
});
