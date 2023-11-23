import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from "react-icons/fa";
import { deletePost } from "../../services/api";
import "./post.scss";
import { POSTS_ROUTE } from "../../services/routes";
const PostView = () => {
  const history = useHistory();
  const location = useLocation();
  const { post } = location.state;
  const { title, content, id } = post;
  const handleDelete = async () => {
    try {
      await deletePost(id);
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditPost = () => {
    history.push("/add", {
      post,
    });
  };
  return (
    <div className="post-view">
      <div className="post-view__header">
        <h2 className="post-view__title">{title}</h2>
        <div className="likes">
          <FaThumbsUp className="like" />
          <span>{14}</span>
          <FaThumbsDown className="dislike" />
          <span>{12}</span>
          <FaEdit className="edit" onClick={handleEditPost} />
          <FaTrash className="delete" onClick={handleDelete} />
        </div>
      </div>
      <p className="post-view__content">{content}</p>
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
        {["this is a comment"].map((comment) => (
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
