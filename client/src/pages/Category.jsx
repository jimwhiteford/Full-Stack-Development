import { useParams } from "react-router-dom";
import { React, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import PostCard from "../compoents/PostCard";
import Categories from "../compoents/Categories";

export default function Category() {
  const [post, setPost] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/category/${slug}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-black">
        <div className="lg:col-span-8 col-span-1">
          {post.map((post, index) => (
            <PostCard post={post} key={post.title} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
