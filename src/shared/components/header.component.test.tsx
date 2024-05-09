import { render, screen, within } from '@testing-library/react';

import { Header } from './header.component';

jest.mock('./upload-button.component', () => ({
  UploadButton: jest.fn(() => (
    <label>
      <input type="file" /> Choose Files(s)
    </label>
  )),
}));

const mockUseAuth = jest.fn();
jest.mock('@clerk/nextjs', () => ({
  ClerkLoading: jest.fn(({ children }) => <div>{children}</div>),
  ClerkLoaded: jest.fn(({ children }) => <div>{children}</div>),
  SignInButton: jest.fn(({ children }) => <div>{children}</div>),
  UserButton: jest.fn(() => (
    <div>
      <button aria-label="Open user button">user</button>
    </div>
  )),
  useAuth: () => mockUseAuth(),
}));

describe('<Header>', () => {
  describe('Render', () => {
    beforeEach(() => {
      mockUseAuth.mockClear();
    });

    it('should render a header element with a logo link', () => {
      mockUseAuth.mockImplementation(() => ({
        isSignedIn: false,
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
      mockUseAuth.mockImplementation(() => ({
        isSignedIn: false,
      }));

      render(<Header />);

      const signInButton = screen.getByRole('button', {
        name: /sign in/i,
      });

      expect(signInButton).toBeInTheDocument();
    });

    it('should render a user button and a nav element with dashboard link if the user is authenticated', () => {
      mockUseAuth.mockImplementation(() => ({
        isSignedIn: true,
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
      expect(mockUseAuth).toHaveBeenCalledTimes(1);
    });

    it('should render a placeholder div', () => {
      mockUseAuth.mockImplementation(() => ({
        isSignedIn: false,
      }));

      render(<Header />);

      const skeleton = screen.getByRole('status');

      expect(skeleton).toBeInTheDocument();
    });
  });
});
