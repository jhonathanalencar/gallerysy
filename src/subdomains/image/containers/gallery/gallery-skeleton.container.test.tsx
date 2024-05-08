import { render, screen } from '@testing-library/react';

import { GalleryContainerSkeleton } from './gallery-skeleton.container';

describe('<GalleryContainerSkeleton>', () => {
  describe('Render', () => {
    it('should render a section element', () => {
      render(<GalleryContainerSkeleton />);

      const section = screen.getByRole('region', {
        name: /gallery loading/i,
      });

      expect(section).toBeInTheDocument();
    });

    it('should render 9 skeleton components', () => {
      render(<GalleryContainerSkeleton />);

      const skeletons = screen.getAllByRole('status');

      expect(skeletons).toHaveLength(9);
      skeletons.forEach((skeleton) => {
        expect(skeleton).toHaveClass('animate-shimmer bg-shimmer');
      });
    });
  });
});
