import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { PostCard } from "./components/post-card";
import { posts } from "./data";
import { FaPlus, FaArrowCircleLeft } from "react-icons/fa";
import { PostView, PostCreate } from "./modules";
import "./main.scss";
function App() {
  const history = useHistory();
  const location = useLocation();
  const handleAddPost = () => {
    history.push("/add");
  };
  const handlePostView = (id) => {
    history.push(`/post:${id}`);
  };
  const getTitle = () => {
    const path = location.pathname;
    if (path === "/add") {
      return "Add Post";
    }
    if (path.includes("/post:")) {
      return "Post";
    }
    return "Home";
  };
  const goBack = () => {
    history.goBack();
  };
  return (
    <main>
      <header className="app-header">
        {getTitle() !== "Home" && (
          <FaArrowCircleLeft className="back-btn" onClick={goBack} />
        )}
        <h3 className="app-header__text">{getTitle()}</h3>
      </header>
      <Switch>
        <Route path="/post:id">
          <PostView />
        </Route>
        <Route path="/add">
          <PostCreate />
        </Route>
        <Route path="/">
          <PostCardsContainer onClick={handlePostView} />
          <button className="add-post-btn" onClick={handleAddPost}>
            <FaPlus />
          </button>
        </Route>
      </Switch>
    </main>
  );
}

const PostCardsContainer = ({ onClick }) => {
  return (
    <div className="post-cards-container">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onClick={onClick} />
      ))}
    </div>
  );
};

export default App;
