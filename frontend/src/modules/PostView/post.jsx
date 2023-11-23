import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./post.scss";
import { useLocation } from "react-router-dom";
const PostView = () => {
  const location = useLocation();

  const ownPost = true;
  const liked = true;
  return (
    <div className="post-view-view">
      <div className="post-view__header">
        <h2 className="post-view__title">{"title"}</h2>
        <div className="likes">
          <FaThumbsUp className="like" />
          <span>{14}</span>
          <FaThumbsDown className="dislike" />
          <span>{12}</span>
        </div>
      </div>
      <p className="post-view__content">{"content"}</p>
      <div className="post-view__add-comment">
        <h3 className="post-view__add-comment__header">Comment</h3>
        <textarea
          className="post-view__add-comment__textarea"
          placeholder="Add your comment here"
        />
        <button className="post-view__add-comment__add-btn">Add Comment</button>
      </div>
      <div className="post-view__comments">
        <h3 className="post-view__comments__header">Users Comments</h3>
        {[].map((comment) => (
          <div key={1} className="post-view__comments__comment">
            <p className="author">Salman</p>
            <p className="comment">{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { PostView };
