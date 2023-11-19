import React from "react";
import { FaHeart } from "react-icons/fa";
import "./post-card.scss";

const PostCard = ({ post }) => {
  const liked = true;
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="post-card__footer">
        <div className="post-card__footer__likes">
          <FaHeart className={`${liked ? "liked" : ""}`} />
          <span>{post.likes}</span>
        </div>
        <button className="post-card__footer__view-btn">View</button>
      </div>
    </div>
  );
};

export { PostCard };
