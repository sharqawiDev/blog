import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./post-card.scss";

const PostCard = ({ post, onClick }) => {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="post-card__footer">
        <div className="post-card__footer__likes">
          <FaThumbsUp className="like" />
          <span>{14}</span>
          <FaThumbsDown className="dislike" />
          <span>{2}</span>
        </div>
        <button
          className="post-card__footer__view-btn"
          onClick={() => onClick(post)}
        >
          View
        </button>
      </div>
    </div>
  );
};

export { PostCard };
