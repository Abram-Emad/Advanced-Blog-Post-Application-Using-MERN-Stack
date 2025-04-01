const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const {
  Comment,
  validateCreateComment,
  validateUpdateComment,
  validateReplyComment,
} = require("../models/Comment");
const { User } = require("../models/User");

/**-----------------------------------------------
 * @desc    Create New Comment
 * @route   /api/comments
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const profile = await User.findById(req.user.id);

  const comment = await Comment.create({
    postId: req.body.postId,
    text: req.body.text,
    user: req.user.id,
    username: profile.username,
    profilePhoto: profile.profilePhoto,
  });

  res.status(201).json(comment);
});

/**-----------------------------------------------
 * @desc    Get All Comments
 * @route   /api/comments
 * @method  GET
 * @access  private (only admin)
 ------------------------------------------------*/
module.exports.getAllCommentsCtrl = asyncHandler(async (req, res) => {
  const comments = await Comment.find().populate("user");
  res.status(200).json(comments);
});

/**-----------------------------------------------
 * @desc    Delete Comment
 * @route   /api/comments/:id
 * @method  DELETE
 * @access  private (only admin or owner of the comment)
 ------------------------------------------------*/
module.exports.deleteCommentCtrl = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }

  if (req.user.isAdmin || req.user.id === comment.user.toString()) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "comment has been deleted" });
  } else {
    res.status(403).json({ message: "access denied, not allowed" });
  }
});

/**-----------------------------------------------
 * @desc    Update Comment
 * @route   /api/comments/:id
 * @method  PUT
 * @access  private (only owner of the comment)
 ------------------------------------------------*/
module.exports.updateCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }

  if (req.user.id !== comment.user.toString()) {
    return res.status(403).json({
      message: "access denied, only user himself can edit his comment",
    });
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        text: req.body.text,
      },
    },
    { new: true }
  );

  res.status(200).json(updatedComment);
});

/**-----------------------------------------------
 * @desc    Create New Comment Reply
 * @route   /api/comments/reply
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
module.exports.replyCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateReplyComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const profile = await User.findById(req.user.id);

  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        commentReplies: {
          postId: req.body.postId,
          text: req.body.text,
          user: req.user.id,
          username: profile.username,
          profilePhoto: profile.profilePhoto,
        },
      },
    },
    { new: true }
  );
  res.status(201).json(comment);
});

/**-----------------------------------------------
 * @desc    Delete Comment Reply
 * @route   /api/comments/reply/:id
 * @method  DELETE
 * @access  private (only admin or owner of the comment)
 ------------------------------------------------*/
module.exports.deleteCommentReplyCtrl = asyncHandler(async (req, res) => {
  const replyId = req.params.id;

  const comment = await Comment.findOne({
    "commentReplies._id": new mongoose.Types.ObjectId(replyId),
  });

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const reply = comment.commentReplies.find(
    (reply) => reply._id.toString() === replyId
  );

  if (!reply) {
    return res.status(404).json({ message: "Reply not found" });
  }

  if (req.user.isAdmin || req.user.id === reply.user.toString()) {
    const deletedCommentReply = await Comment.findOneAndUpdate(
      { _id: comment._id },
      { $pull: { commentReplies: { _id: reply._id } } },
      { new: true }
    );
    return res.status(200).json(deletedCommentReply);
  } else {
    return res.status(403).json({ message: "Access denied, not allowed" });
  }
});

/**-----------------------------------------------
 * @desc    Update Comment Reply
 * @route   /api/comments/reply/:id
 * @method  PUT
 * @access  private (only owner of the comment)
 ------------------------------------------------*/
module.exports.updateCommentReplyCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const replyId = req.params.id;
  const userId = req.user.id;

  const comment = await Comment.findOne({
    "commentReplies._id": new mongoose.Types.ObjectId(replyId),
  });

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const reply = comment.commentReplies.find(
    (reply) => reply._id.toString() === replyId
  );

  if (!reply) {
    return res.status(404).json({ message: "Reply not found" });
  }

  if (reply.user.toString() !== userId) {
    return res.status(403).json({
      message: "Access denied, only the user who posted the reply can edit it",
    });
  }

  const updatedComment = await Comment.findOneAndUpdate(
    { "commentReplies._id": new mongoose.Types.ObjectId(replyId) },
    { $set: { "commentReplies.$.text": req.body.text } },
    { new: true }
  );

  if (!updatedComment) {
    return res.status(500).json({ message: "Failed to update reply" });
  }

  res.status(200).json(updatedComment);
});
