const { User } = require("./user");
const { Post, UserPostVote } = require("./post");
const { Comment, UserCommentVote } = require("./comment");

// user to post relation as publisher (one-to-many)
User.hasMany(Post, { as: "Posts", foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

// user to post relation as liked (many-to-many)
User.belongsToMany(Post, {
  through: UserPostVote,
  as: "PostVotes",
  timestamps: true,
});
Post.belongsToMany(User, {
  through: UserPostVote,
  as: "UserVotes",
  timestamps: true,
});

// user to comment relation as publisher (one-to-many)
User.hasMany(Comment, { as: "Comments", foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

// user to comment relation as liked (many-to-many)
User.belongsToMany(Comment, {
  through: UserCommentVote,
  as: "CommentVotes",
  timestamps: true,
});
Comment.belongsToMany(User, {
  through: UserCommentVote,
  as: "UserVotes",
  timestamps: true,
});

// post to comment relation (one-to-many)
Post.hasMany(Comment, { as: "Comments", foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });
