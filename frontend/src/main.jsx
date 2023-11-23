import {
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import { PostCard } from "./components";
import { posts } from "./data";
import { FaPlus, FaArrowCircleLeft } from "react-icons/fa";
import { PostView, PostCreate, Login } from "./modules";
import { LOGIN_ROUTE } from "./services/routes";
import "./main.scss";
function App() {
  const history = useHistory();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token") ? true : false;
  const handleAddPost = () => {
    history.push("/add");
  };
  const handlePostView = (id) => {
    history.push(`/post/${id}`);
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
      </header>
      <Switch>
        <Route path="/" exact>
          <PostCardsContainer onClick={handlePostView} />
          <button className="add-post-btn" onClick={handleAddPost}>
            <FaPlus />
          </button>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/post/:id">
          <PostView />
        </Route>
        <Route path="/add">
          <PostCreate />
        </Route>

        <Route path="*">
          <h1>404</h1>
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

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
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
