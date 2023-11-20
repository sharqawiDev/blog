const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Post = db.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    publishedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

const UserPostVote = db.define(
  "UserPostVote",
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

module.exports = { Post, UserPostVote };
