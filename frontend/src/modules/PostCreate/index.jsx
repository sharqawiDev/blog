import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { submitPost, editPost } from "../../services/api";
import "./post.scss";
const PostCreate = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [draft, setDraft] = React.useState(false);
  const history = useHistory();
  const location = useLocation();
  const getBtnText = () => {
    return draft ? "Edit Post" : "Add Post";
  };
  const handleSubmit = async () => {
    try {
      await submitPost({ title, content });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async () => {
    try {
      const { post } = location.state;
      await editPost({ title, content, postId: post.id });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (location.state) {
      const { post } = location.state;
      console.log(post);
      setTitle(post.title);
      setContent(post.content);
      setDraft(true);
    }
  }, []);
  return (
    <div className="post-create">
      <div className="post-create__header">
        <input
          className="post-create__header__title"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="post-create__add-post">
        <button
          className="post-create__add-post__add-btn"
          type="submit"
          onClick={() => (draft ? handleEdit() : handleSubmit())}
          disabled={!title || !content}
        >
          {getBtnText()}
        </button>
      </div>
    </div>
  );
};

export { PostCreate };
