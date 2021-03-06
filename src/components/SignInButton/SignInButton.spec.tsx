import {render, screen} from "@testing-library/react"
import { mocked } from "ts-jest/utils"
import { useSession } from "next-auth/client"
import { SignInButton } from "."

jest.mock('next-auth/client');

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const mockedUseSession = mocked(useSession);

    mockedUseSession.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  });

  it('renders correctly when user is authenticated', () => {
    const mockedUseSession = mocked(useSession);

    mockedUseSession.mockReturnValueOnce([{
      user: { name: 'John Doe', email: 'john.doe@email.com' }, expires: 'fake-expires'
    }, false]);

    render(<SignInButton />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
})
