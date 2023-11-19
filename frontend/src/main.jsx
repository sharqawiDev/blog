import "./main.scss";
import { PostCard } from "./components/post-card";
import { posts } from "./data";
import { FaPlus } from "react-icons/fa";
import Post from "./modules/Post/post";
function App() {
  return (
    <main>
      <Post post={posts[0]} />
      {/* <PostCardsContainer />
      <button className="add-post-btn">
        <FaPlus />
      </button> */}
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
