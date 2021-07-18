import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"

import { Async } from "."

test("renders correctly", async () => {
  render(<Async />);

  expect(screen.getByText('Hello world!')).toBeInTheDocument();

  // Metodos para verificar se elemento existe ou não de forma assincrona

  // Method 01 - Verifica se documento está em tela
  // expect(await screen.findByText('Button 01')).toBeInTheDocument();

  // Method 02 - Verifica se documento está em tela
  // await waitFor(() => {
  //   return expect(screen.getByText('Button 01')).toBeInTheDocument();
  // });

  // Method 03 - Verifica se documento não está em tela
  await waitForElementToBeRemoved(screen.queryByText('Button 02'));

/**
 * Metodos para capturar elementos em tela
 * 
 * 1 - get...   - procura de forma síncrona. Se não encontrar dispara erro
 * 2 - find...  - procura de forma assíncrona. Se não encontrar, continua procurando até timeout estourar
 * 3 - query... - produra de forma sincrona. Se não encontrar, não dispara erro
 */

})