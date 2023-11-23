import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import { PostCard } from "./components";
import { FaPlus, FaArrowCircleLeft, FaSignOutAlt } from "react-icons/fa";
import { PostView, PostCreate, Login } from "./modules";
import { LOGIN_ROUTE } from "./services/routes";
import { logout, getPosts } from "./services/api";
import "./main.scss";
function App() {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token");
  const handleAddPost = () => {
    history.push("/add");
  };
  const handlePostView = (post) => {
    history.push(`/post/${post.id}`, {
      post,
    });
  };
  const getTitle = () => {
    const path = location.pathname;
    if (path === "/add") {
      return "Add Post";
    }
    if (path.includes("/post/")) {
      return "Post";
    }
    return "Home";
  };
  const goBack = () => {
    history.goBack();
  };
  const getUsersPosts = async () => {
    try {
      const posts = (await getPosts()).data;
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      getUsersPosts();
    }
  }, [history.location.pathname, isAuthenticated]);
  return (
    <main>
      <header className="app-header">
        {getTitle() !== "Home" && (
          <FaArrowCircleLeft className="back-btn" onClick={goBack} />
        )}
        <img
          src={new URL("./assets/images/logo.png", import.meta.url).href}
          alt="logo"
          className="app-header__logo"
          style={{ width: "50px", height: "50px" }}
        />
        <h3 className="app-header__text">{getTitle()}</h3>
        {isAuthenticated && (
          <FaSignOutAlt className="logout-btn" onClick={logout} />
        )}
      </header>
      <Switch>
        <PrivateRoute path="/" exact isAuthenticated={isAuthenticated}>
          <PostCardsContainer onClick={handlePostView} posts={posts} />
          <button className="add-post-btn" onClick={handleAddPost}>
            <FaPlus />
          </button>
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/post/:id" isAuthenticated={isAuthenticated}>
          <PostView />
        </PrivateRoute>
        <PrivateRoute path="/add" isAuthenticated={isAuthenticated}>
          <PostCreate />
        </PrivateRoute>
        <Route path="*">
          <h1>404</h1>
        </Route>
      </Switch>
    </main>
  );
}

const PostCardsContainer = ({ onClick, posts }) => {
  return (
    <div className="post-cards-container">
      {posts?.length ? (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onClick={onClick} />
        ))
      ) : (
        <h2>No posts found, add a new one!</h2>
      )}
    </div>
  );
};

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{ pathname: LOGIN_ROUTE, state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default App;
