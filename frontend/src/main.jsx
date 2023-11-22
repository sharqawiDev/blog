import "./main.scss";
import { PostCard } from "./components/post-card";
import { posts } from "./data";
import { FaPlus } from "react-icons/fa";
import { PostView, PostCreate } from "./modules";
function App() {
  return (
    <main>
      {/* <PostView post={posts[0]} /> */}
      {/* <PostCardsContainer />
      <button className="add-post-btn">
        <FaPlus />
      </button> */}
      <PostCreate />
    </main>
  );
}

const PostCardsContainer = () => {
  return (
    <div className="post-cards-container">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default App;
