import React from "react";
import { FaHeart } from "react-icons/fa";
import "./post.scss";
const Post = ({ post }) => {
  const { id, title, content, likes, comments } = post;
  const ownPost = true;
  const liked = true;
  return (
    <div className="post">
      <div className="post__header">
        <h2 className="post__title">{title}</h2>
        <div className="likes">
          <FaHeart className={`${liked ? "liked" : ""}`} />
          <span>{likes}</span>
        </div>
      </div>
      <p className="post__content">{content}</p>
      <div className="post__add-comment">
        <h3 className="post__add-comment__header">Comment</h3>
        <textarea
          className="post__add-comment__textarea"
          placeholder="Add your comment here"
        />
        <button className="post__add-comment__add-btn">Add Comment</button>
      </div>
      <div className="post__comments">
        <h3 className="post__comments__header">Users Comments</h3>
        {comments.map((comment) => (
          <div key={id} className="post__comments__comment">
            <p className="author">Salman</p>
            <p className="comment">{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
