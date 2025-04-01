const mongoose = require("mongoose");
const Joi = require("joi");

// Comment Schema
const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
        publicId: null,
      },
    },
    commentReplies: [
      {
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        profilePhoto: {
          type: Object,
          default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
            publicId: null,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Comment Model
const Comment = mongoose.model("Comment", CommentSchema);

// Validate Create Comment
function validateCreateComment(obj) {
  const schema = Joi.object({
    postId: Joi.string().required().label("Post ID"),
    text: Joi.string().trim().required().label("Text"),
  });
  return schema.validate(obj);
}

// Validate Update Comment
function validateUpdateComment(obj) {
  const schema = Joi.object({
    text: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

// Validate Reply Comment
function validateReplyComment(obj) {
  const schema = Joi.object({
    postId: Joi.string().required().label("Post ID"),
    text: Joi.string().trim().required().label("Text"),
  });
  return schema.validate(obj);
}

module.exports = {
  Comment,
  validateCreateComment,
  validateUpdateComment,
  validateReplyComment,
};
