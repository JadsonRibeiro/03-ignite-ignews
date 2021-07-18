import {render, screen} from "@testing-library/react"
import { Header } from "."

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
});

jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

describe('Header component', () => {
  it('renders correctly', () => {
    render(
      <Header />
    );
  
    // screen.logTestingPlaygroundURL();

    /**
     * Para verificar se um elemento está em tela eu posso usar tanto o screen (mais fácil) 
     * importado de @testing-library, como o o getByText retornado de render.
     */

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });
})