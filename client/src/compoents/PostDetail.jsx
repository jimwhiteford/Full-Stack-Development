import React, { useState } from "react";
import { useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const socket = io.connect("http://localhost:4000");

const PostDetail = ({ post }) => {
  const [likes, setLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [newLike, setNewLike] = useState(null);
  const [newLikeNum, setNewLikeNum] = useState(null);

  const sendLike = () => {
    const newLikeNum = likes + 1;
    axios
      .put("http://localhost:3001/updateLike", {
        newLike: newLikeNum,
        id: post._id,
      })
      .catch((err) => {
        console.log(err);
      });
    socket.emit("send_message", {
      likes: "likes have been updated",
      like: newLikeNum,
    });

    setNewLikeNum(newLikeNum);
    setNewLike(newLikeNum);
    setIsLiked(true);
  };

  useEffect(() => {
    setLikes(post.like);
  }, [post.like]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setLikes(likes + 1);
      setNewLike(data.like);
      setLikes(data.like);
    });
  }, [likes]);

  return (
    <div className=" bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={post.photo}
          alt={post.title}
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>
      <button className="block lg:flex text-center items-center justify-center">
        <div
          className="flex items-center justify-center lg: w-full lg: mr-8"
          onClick={isLiked ? undefined : sendLike}
        >
          {isLiked ? (
            <div className="flex text-3xl text-purple-700">
              <FontAwesomeIcon className="mr-2" icon={faThumbsUp} />
              {newLike ? newLike : newLikeNum}
            </div>
          ) : (
            <div title="true" className="text-3xl cursor-pointer">
              <FontAwesomeIcon className="mr-2" icon={faThumbsUp} />
              {newLike ? newLike : post.like}
            </div>
          )}
        </div>
      </button>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full"></div>
        <h1 className="mb-8 text-4xl font-bold text-black">{post.title}</h1>
        <div className="text-black">
          <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
