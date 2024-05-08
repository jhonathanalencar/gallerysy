import { render, screen } from '@testing-library/react';

import type { TPhoto } from '@shared/types/image.type';

import { GalleryInterface } from './gallery.interface';

jest.mock('../components/photo.component', () => ({
  Photo: jest.fn(({ image }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image.imageUrl} alt={image.name} />;
  }),
}));

const mockImages: TPhoto[] = [
  {
    name: 'test-image-name',
    imageUrl: 'http://test-image-url',
    blurredDataUrl: 'test-blurred-data-url',
    userId: 'test-user-id',
    imageId: 1,
    createdAt: new Date('2024-05-05T10:00:00.000Z'),
  },
  {
    name: 'test-image-name-2',
    imageUrl: 'http://test-image-url-2',
    blurredDataUrl: 'test-blurred-data-url-2',
    userId: 'test-user-id-2',
    imageId: 2,
    createdAt: new Date('2024-05-05T10:00:00.000Z'),
  },
];

describe('<GalleryInterface>', () => {
  describe('Render', () => {
    it('should render a section element', () => {
      render(<GalleryInterface images={mockImages} />);

      const section = screen.getByRole('region', {
        name: /gallery/i,
      });

      expect(section).toBeInTheDocument();
    });

    it('should render an image for each image in the images prop', () => {
      render(<GalleryInterface images={mockImages} />);

      const img = screen.getByRole('img', {
        name: mockImages[0].name,
      });
      const img2 = screen.getByRole('img', {
        name: mockImages[1].name,
      });

      expect(img).toBeInTheDocument();
      expect(img2).toBeInTheDocument();
    });

    it('should render an empty gallery message if images prop is an empty array', () => {
      render(<GalleryInterface images={[]} />);

      const message = screen.getByText(/your image gallery is empty/i);

      expect(message).toBeInTheDocument();
    });
  });
});
