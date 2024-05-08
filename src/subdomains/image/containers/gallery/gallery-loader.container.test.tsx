import { render, screen } from '@testing-library/react';

import { GalleryContainerLoader } from './gallery-loader.container';

const mockImages = [
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

const mockGetImages = jest.fn(() => mockImages);
jest.mock('../../queries', () => ({
  getImages: () => mockGetImages(),
}));

jest.mock('next/image', () =>
  jest.fn(({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ))
);

describe('<GalleryContainerLoader>', () => {
  describe('Render', () => {
    it('should render the images data', async () => {
      const Result = await GalleryContainerLoader();
      render(Result);

      const img1 = screen.getByRole('img', {
        name: mockImages[0].name,
      });
      const img2 = screen.getByRole('img', {
        name: mockImages[1].name,
      });

      expect(img1).toBeInTheDocument();
      expect(img2).toBeInTheDocument();
      expect(mockGetImages).toHaveBeenCalledTimes(1);
      expect(mockGetImages).toHaveReturnedWith(mockImages);
    });
  });
});
