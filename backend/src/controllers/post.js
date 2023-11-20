const db = require("../db");
const authenticateToken = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/posts", authenticateToken, async (req, res) => {
    try {
      const posts = await db.models.Post.findAll();
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  });

  app.post("/posts", authenticateToken, async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = req.user.userId;

      const post = await db.models.Post.create({
        title,
        content,
        userId,
      });

      res.json({ post, message: "Post created successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  });

  app.put("/posts/:postId", authenticateToken, async (req, res) => {
    try {
      const { title, content, isPublished, publishedAt } = req.body;
      const userId = req.user.userId; // Access user ID from the decoded token
      const postId = req.params.postId;

      const post = await db.models.Post.findOne({
        where: { id: postId, userId },
      });

      if (!post) {
        return res
          .status(404)
          .json({ message: "Post not found or unauthorized." });
      }

      post.title = title;
      post.content = content;
      if (!post.isPublished && isPublished) {
        post.publishedAt = new Date();
      }
      post.isPublished = isPublished;
      await post.save();

      res.json({ post, message: "Post updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  });

  app.delete("/posts/:postId", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId; // Access user ID from the decoded token
      const postId = req.params.postId;

      const post = await db.models.Post.findOne({
        where: { id: postId, userId },
      });

      if (!post) {
        return res
          .status(404)
          .json({ message: "Post not found or unauthorized." });
      }

      await post.destroy();

      res.json({ message: "Post deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  });

  app.post("/posts/:postId/like", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId; // Access user ID from the decoded token
      const postId = req.params.postId;

      // Check if the user has already liked/disliked the post
      const existingVote = await db.models.UserPostVote.findOne({
        where: { userId, postId },
      });

      if (existingVote) {
        return res
          .status(400)
          .json({ message: "User has already voted on the post." });
      }

      const { liked } = req.body;

      const vote = await db.models.UserPostVote.create({
        userId,
        postId,
        liked,
      });

      res.json({ vote, message: "Vote recorded successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  });
};
