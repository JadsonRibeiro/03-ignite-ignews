import {render, screen, fireEvent} from "@testing-library/react"
import { mocked } from "ts-jest/utils"
import { useRouter } from "next/router"
import { signIn, useSession } from "next-auth/client"
import { SubscribeButton } from "."

jest.mock('next-auth/client');
jest.mock('next/router');

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const mockedUseSession = mocked(useSession);

    mockedUseSession.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('redirects user to sign in when not authenticated', () => {
    const signInMocked = mocked(signIn);
    const mockedUseSession = mocked(useSession);
    
    mockedUseSession.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects user to posts when authenticated', () => {
    const mockedUseRouter = mocked(useRouter);
    const mockedPush = jest.fn();

    mockedUseRouter.mockReturnValueOnce({
      push: mockedPush
    } as any);

    const mockedUseSession = mocked(useSession);
    mockedUseSession.mockReturnValueOnce([{
      user: {
        name: 'John Doe',
        email: 'john.doe@email.com'
      },
      expires: 'fake-expires',
      activeSubscription: 'fake-subscription'
    }, false]);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(mockedPush).toHaveBeenCalledWith('/posts');
  });
})
