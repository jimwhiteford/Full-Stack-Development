import { render, screen } from "@testing-library/react";
import PostCard from "./PostCard";
import { BrowserRouter } from "react-router-dom";

const MockPostCard = ({ post }) => {
  return (
    <BrowserRouter>
      <PostCard post={post} />
    </BrowserRouter>
  );
};

const post = {
  title: "a title",
  content: "content",
  photo: "photoURL.com",
  like: 6,
};

describe("All Postcard Data should render", () => {
  it("Post Card component renders a title", () => {
    render(<MockPostCard post={post} />);
    const titleElement = screen.getByText(/a title/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("Post Card component renders a photo", () => {
    render(<MockPostCard post={post} />);
    const photoElement = screen.getByRole("img", { src: "photoURL.com" });
    expect(photoElement).toBeInTheDocument();
  });
});
