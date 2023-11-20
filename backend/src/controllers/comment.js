const db = require("../db");
const authenticateToken = require("./path-to-your-middleware");

module.exports = (app) => {
  app.get("/posts/:postId/comments", authenticateToken, async (req, res) => {
    try {
      const postId = req.params.postId;

      // Fetch comments for the specified post
      const comments = await db.models.Comment.findAll({
        where: { postId },
      });

      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  });

  app.post("/posts/:postId/comments", authenticateToken, async (req, res) => {
    try {
      const { content } = req.body;
      const userId = req.user.userId; // Access user ID from the decoded token
      const postId = req.params.postId;

      const comment = await db.models.Comment.create({
        content,
        userId,
        postId,
      });

      res.json({ comment, message: "Comment created successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  });

  app.put(
    "/posts/:postId/comments/:commentId",
    authenticateToken,
    async (req, res) => {
      try {
        const { content } = req.body;
        const userId = req.user.userId; // Access user ID from the decoded token
        const postId = req.params.postId;
        const commentId = req.params.commentId;

        const comment = await db.models.Comment.findOne({
          where: { id: commentId, userId, postId },
        });

        if (!comment) {
          return res
            .status(404)
            .json({ message: "Comment not found or unauthorized." });
        }

        comment.content = content;
        await comment.save();

        res.json({ comment, message: "Comment updated successfully." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error." });
      }
    }
  );

  app.delete(
    "/posts/:postId/comments/:commentId",
    authenticateToken,
    async (req, res) => {
      try {
        const userId = req.user.userId; // Access user ID from the decoded token
        const postId = req.params.postId;
        const commentId = req.params.commentId;

        const comment = await db.models.Comment.findOne({
          where: { id: commentId, userId, postId },
        });

        if (!comment) {
          return res
            .status(404)
            .json({ message: "Comment not found or unauthorized." });
        }

        await comment.destroy();

        res.json({ message: "Comment deleted successfully." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error." });
      }
    }
  );

  app.post(
    "/posts/:postId/comments/:commentId/like",
    authenticateToken,
    async (req, res) => {
      try {
        const userId = req.user.userId; // Access user ID from the decoded token
        const postId = req.params.postId;
        const commentId = req.params.commentId;

        // Check if the user has already liked/disliked the comment
        const existingVote = await db.models.UserCommentVote.findOne({
          where: { userId, commentId },
        });

        if (existingVote) {
          return res
            .status(400)
            .json({ message: "User has already voted on the comment." });
        }

        const { liked } = req.body;

        const vote = await db.models.UserCommentVote.create({
          userId,
          commentId,
          liked,
        });

        res.json({ vote, message: "Vote recorded successfully." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error." });
      }
    }
  );
};
