import { render, screen } from "@testing-library/react"
import { mocked } from "ts-jest/utils"
import { getPrismicClient } from ".././../services/prismic"

import Posts, { getStaticProps } from "../../pages/posts"

jest.mock('.././../services/prismic');

const posts = [
  { slug: 'my-new-post', title: 'My New Post', excerpt: 'Post excerpt', updatedAt: '10 de abril' }
]

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
  });

  it("loads initial data/props", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                { type: 'heading', text: 'My new post' }
              ],
              content: [
                { type: 'paragraph', text: 'Post excerpt' }
              ]
            },
            last_publication_date: '04-01-2021'
          }
        ]
      })
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My new post',
            excerpt: 'Post excerpt',
            updatedAt: '01 de abril de 2021' 
          }]
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