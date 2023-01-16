import { render, screen } from "@testing-library/react";
import PostDetail from "./PostDetail";

import "@testing-library/jest-dom";

const post = {
  title: "a title",
  content: "content",
  photo: "photoURL.com",
  like: 6,
};

describe("Post Detail should render all post data", () => {
  it("Post Detail component renders a title", () => {
    render(<PostDetail post={post} />);
    const titleElement = screen.getByText(/a title/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("Post Detail component renders some content", () => {
    render(<PostDetail post={post} />);
    const contentElement = screen.getByText(/content/i);
    expect(contentElement).toBeInTheDocument();
  });

  it("Post Detail component renders a photo", () => {
    render(<PostDetail post={post} />);
    const photoElement = screen.getByRole("img", { src: "photoURL.com" });
    expect(photoElement).toBeInTheDocument();
  });
});
