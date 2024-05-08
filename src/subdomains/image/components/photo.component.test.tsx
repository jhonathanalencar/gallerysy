import { render, screen } from '@testing-library/react';

import type { TPhoto } from '@shared/types/image.type';

import { Photo } from './photo.component';

const mockPhoto: TPhoto = {
  name: 'test-image-name',
  imageUrl: 'http://test-image-url',
  blurredDataUrl: 'test-blurred-data-url',
  userId: 'test-user-id',
  imageId: 1,
  createdAt: new Date('2024-05-05T10:00:00.000Z'),
};

jest.mock('next/image', () =>
  jest.fn(({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ))
);

describe('<Photo>', () => {
  describe('Render', () => {
    it('should render an img element with correct props', () => {
      render(<Photo image={mockPhoto} />);

      const img = screen.getByRole('img', {
        name: /test-image-nam/i,
      });

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', mockPhoto.imageUrl);
      expect(img).toHaveAttribute('alt', mockPhoto.name);
    });
  });
});
