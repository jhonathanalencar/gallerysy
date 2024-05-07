import { verifySession } from './dal.lib';

const mockVerifySession = jest.fn();
jest.mock('./dal.lib', () => ({
  verifySession: () => mockVerifySession(),
}));

describe('VerifySession()', () => {
  beforeEach(() => {
    mockVerifySession.mockClear();
  });

  it('should return an object with isAuthenticated and userId properties when userId exists', () => {
    mockVerifySession.mockImplementation(() => ({
      isAuthenticated: true,
      userId: '123',
    }));

    const result = verifySession();

    expect(result).toEqual({ isAuthenticated: true, userId: '123' });
    expect(mockVerifySession).toHaveBeenCalledTimes(1);
  });

  it('should return an object with isAuthenticated=false and userId=null when userId does not exist', () => {
    mockVerifySession.mockImplementation(() => ({
      isAuthenticated: false,
      userId: null,
    }));

    const result = verifySession();

    expect(result).toEqual({ isAuthenticated: false, userId: null });
    expect(mockVerifySession).toHaveBeenCalledTimes(1);
  });
});
