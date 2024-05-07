import { render, screen, within } from '@testing-library/react';

import { Header } from './header.component';

const mockAuth = jest.fn();
jest.mock('@clerk/nextjs/server', () => ({
  auth: () => mockAuth(),
}));
jest.mock('@clerk/nextjs', () => ({
  ClerkLoading: jest.fn(({ children }) => <div>{children}</div>),
  SignInButton: jest.fn(({ children }) => <div>{children}</div>),
  UserButton: jest.fn(() => (
    <div>
      <button aria-label="Open user button">user</button>
    </div>
  )),
}));

describe('<Header>', () => {
  describe('Render', () => {
    beforeEach(() => {
      mockAuth.mockClear();
    });

    it('should render a header element and a nav element with a logo link', () => {
      mockAuth.mockImplementation(() => ({ userId: null }));

      render(<Header />);

      const header = screen.getByRole('banner');
      const nav = screen.getByRole('navigation');
      const logoLink = within(nav).getByRole('link', {
        name: /gallerysy/i,
      });

      expect(header).toBeInTheDocument();
      expect(nav).toBeInTheDocument();
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('should render a sign-in button when user is not authenticated', () => {
      mockAuth.mockImplementation(() => ({ userId: null }));

      render(<Header />);

      const signInButton = screen.getByRole('button', {
        name: /sign in/i,
      });

      expect(signInButton).toBeInTheDocument();
    });

    it('should render a user button if the user is authenticated', () => {
      mockAuth.mockImplementation(() => ({ userId: 'fake_user_id' }));

      render(<Header />);

      const button = screen.getByRole('button', {
        name: /open user button/i,
      });

      expect(button).toBeInTheDocument();
      expect(mockAuth).toHaveBeenCalledTimes(1);
    });

    it('should render a placeholder div', () => {
      mockAuth.mockImplementation(() => ({ userId: null }));

      render(<Header />);

      const skeleton = screen.getByRole('status');

      expect(skeleton).toBeInTheDocument();
    });
  });
});
