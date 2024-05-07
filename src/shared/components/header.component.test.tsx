import { render, screen, within } from '@testing-library/react';

import { Header } from './header.component';

const mockVerifySession = jest.fn();
jest.mock('../libs/dal.lib', () => ({
  verifySession: () => mockVerifySession(),
}));

jest.mock('@clerk/nextjs', () => ({
  ClerkLoading: jest.fn(({ children }) => <div>{children}</div>),
  ClerkLoaded: jest.fn(({ children }) => <div>{children}</div>),
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
      mockVerifySession.mockClear();
    });

    it('should render a header element with a logo link', () => {
      mockVerifySession.mockImplementation(() => ({
        isAuthenticated: false,
        userId: null,
      }));

      render(<Header />);

      const header = screen.getByRole('banner');
      const logoLink = within(header).getByRole('link', {
        name: /gallerysy/i,
      });

      expect(header).toBeInTheDocument();
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('should render a sign-in button when user is not authenticated', () => {
      mockVerifySession.mockImplementation(() => ({
        isAuthenticated: false,
        userId: null,
      }));

      render(<Header />);

      const signInButton = screen.getByRole('button', {
        name: /sign in/i,
      });

      expect(signInButton).toBeInTheDocument();
    });

    it('should render a user button and a nav element with dashboard link if the user is authenticated', () => {
      mockVerifySession.mockImplementation(() => ({
        isAuthenticated: true,
        userId: 'fake_user_id',
      }));

      render(<Header />);

      const button = screen.getByRole('button', {
        name: /open user button/i,
      });
      const nav = screen.getByRole('navigation');
      const dashboardLink = within(nav).getByRole('link', {
        name: /dashboard/i,
      });

      expect(button).toBeInTheDocument();
      expect(nav).toBeInTheDocument();
      expect(dashboardLink).toBeInTheDocument();
      expect(dashboardLink).toHaveAttribute('href', '/dashboard');
      expect(mockVerifySession).toHaveBeenCalledTimes(1);
    });

    it('should render a placeholder div', () => {
      mockVerifySession.mockImplementation(() => ({
        isAuthenticated: false,
        userId: null,
      }));

      render(<Header />);

      const skeleton = screen.getByRole('status');

      expect(skeleton).toBeInTheDocument();
    });
  });
});
