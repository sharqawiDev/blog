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
import { PostView, PostCreate, Login, Register } from "./modules";
import {
  ADD_POST_ROUTE,
  LOGIN_ROUTE,
  POSTS_ROUTE,
  REGISTER_ROUTE,
} from "./services/routes";
import { logout, getPosts } from "./services/api";
import "./main.scss";
function App() {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token");
  const handleAddPost = () => {
    history.push(ADD_POST_ROUTE);
  };
  const handlePostView = (post) => {
    history.push(`${POSTS_ROUTE}/${post.id}`, {
      post,
    });
  };
  const getTitle = () => {
    const path = location.pathname;
    if (path === ADD_POST_ROUTE) {
      return "Add Post";
    }
    if (path.includes(POSTS_ROUTE)) {
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
        <Route path={LOGIN_ROUTE}>
          <Login />
        </Route>
        <Route path={REGISTER_ROUTE}>
          <Register />
        </Route>
        <PrivateRoute
          path={`${POSTS_ROUTE}/:id`}
          isAuthenticated={isAuthenticated}
        >
          <PostView />
        </PrivateRoute>
        <PrivateRoute path={ADD_POST_ROUTE} isAuthenticated={isAuthenticated}>
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
