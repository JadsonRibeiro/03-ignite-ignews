import { render, screen } from "@testing-library/react"
import { mocked } from "ts-jest/utils";

import { stripe } from "../../services/stipe"
import Home, { getStaticProps } from "../../pages"

jest.mock('../../services/stipe');
jest.mock('next/router');
jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

describe("Home page", () => {
  it("renders correctly", () => {
    render(<Home product={{ amount: "R$10,00", priceId: "fake-price-id" }} />);

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument();
  });

  it("loads initial data/props", async () => {
    const retriveStripePricesMocked = mocked(stripe.prices.retrieve);
    retriveStripePricesMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1000
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "$10.00"
          }
        }
      })
    )
  })
});

/**
 * Na Home há o SubscribeButton, mas como ele já está testado unitariamente
 * não é preciso testá-lo nesse momento. Como é um teste unitário, o objetivo
 * é testar o comportamento da Home isoladamente
 */ 