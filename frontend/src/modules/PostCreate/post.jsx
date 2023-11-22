import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./post.scss";
const PostCreate = () => {
  const [draft, setDraft] = React.useState(false);
  const getBtnText = () => {
    return draft ? "Save as Draft" : "Add Post";
  };
  return (
    <div className="post-create-create">
      <div className="post-create__header">
        <input
          className="post-create__header__title"
          placeholder="Post title"
        />
        <div className="post-create__header__likes">
          <FaThumbsUp className="like" />
          <span>{14}</span>
          <FaThumbsDown className="dislike" />
          <span>{3}</span>
        </div>
      </div>
      <div className="post-create__content">
        <textarea
          className="post-create__content__text"
          placeholder="Add content to your post..."
        />
      </div>
      <div className="post-create__add-post">
        <p className="draft-text">Draft</p>
        <label className="switch" onChange={() => setDraft(!draft)}>
          <input type="checkbox" value={draft} />
          <span className="slider round"></span>
        </label>
        <button className="post-create__add-post__add-btn">
          {getBtnText()}
        </button>
      </div>
    </div>
  );
};

export { PostCreate };
