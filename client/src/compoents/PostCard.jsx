import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div
      data-testid="postcard-1"
      className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8"
    >
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img
          src={post.photo}
          alt={post.title}
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <h1 className="text-black transition duration-300 text-center mb-8 cursor-pointer hover: text-3xl font-semibold">
        <Link to={`/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="text-center">
        <Link to={`/${post.slug}`}>
          <span className="transition duration-200 transform hover:-translate-y-1 inline-block hover:bg-purple-500 bg-purple-700 text-lg font-medium rounded-full text-white px-8 py-2 cursor-pointer">
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
