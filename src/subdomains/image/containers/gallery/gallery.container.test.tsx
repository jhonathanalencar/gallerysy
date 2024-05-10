import { render, screen } from '@testing-library/react';

import { GalleryContainer } from './gallery.container';
import { GalleryInterface } from '../../interfaces/gallery.interface';

const mockImages = [
  {
    name: 'test-image-name',
    imageUrl: 'http://test-image-url',
    blurredDataUrl: 'test-blurred-data-url',
    userId: 'test-user-id',
    imageId: 1,
    createdAt: new Date('2024-05-05T10:00:00.000Z'),
  },
];

jest.mock('../../../../shared/components/header.component', () => ({
  Header: jest.fn(() => <header>header</header>),
}));
jest.mock('next/image', () =>
  jest.fn(({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ))
);
jest.mock('../../actions', () => ({
  getImagesAction: jest.fn(() => mockImages),
}));
const mockGalleryInterface = jest.mocked(
  <GalleryInterface images={mockImages} />
);
jest.mock('./gallery-loader.container', () => ({
  GalleryContainerLoader: jest.fn(() => mockGalleryInterface),
}));

describe('<GalleryContainer>', () => {
  describe('Render', () => {
    it('should render a main element', () => {
      render(<GalleryContainer />);

      const main = screen.getByRole('main');

      expect(main).toBeInTheDocument();
    });

    it('should render an image', () => {
      render(<GalleryContainer />);

      const img = screen.getByRole('img', {
        name: mockImages[0].name,
      });

      expect(img).toBeInTheDocument();
    });
  });
});
