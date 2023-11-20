const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Comment = db.define(
  "Comment",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserCommentVote = db.define(
  "UserCommentVote",
  {
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Comment, UserCommentVote };
