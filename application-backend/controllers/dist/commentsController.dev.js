"use strict";

var asyncHandler = require("express-async-handler");

var mongoose = require("mongoose");

var _require = require("../models/Comment"),
    Comment = _require.Comment,
    validateCreateComment = _require.validateCreateComment,
    validateUpdateComment = _require.validateUpdateComment,
    validateReplyComment = _require.validateReplyComment;

var _require2 = require("../models/User"),
    User = _require2.User;
/**-----------------------------------------------
 * @desc    Create New Comment
 * @route   /api/comments
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/


module.exports.createCommentCtrl = asyncHandler(function _callee(req, res) {
  var _validateCreateCommen, error, profile, comment;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _validateCreateCommen = validateCreateComment(req.body), error = _validateCreateCommen.error;

          if (!error) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: error.details[0].message
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 5:
          profile = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(Comment.create({
            postId: req.body.postId,
            text: req.body.text,
            user: req.user.id,
            username: profile.username,
            profilePhoto: profile.profilePhoto
          }));

        case 8:
          comment = _context.sent;
          res.status(201).json(comment);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
});
/**-----------------------------------------------
 * @desc    Get All Comments
 * @route   /api/comments
 * @method  GET
 * @access  private (only admin)
 ------------------------------------------------*/

module.exports.getAllCommentsCtrl = asyncHandler(function _callee2(req, res) {
  var comments;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Comment.find().populate("user"));

        case 2:
          comments = _context2.sent;
          res.status(200).json(comments);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
/**-----------------------------------------------
 * @desc    Delete Comment
 * @route   /api/comments/:id
 * @method  DELETE
 * @access  private (only admin or owner of the comment)
 ------------------------------------------------*/

module.exports.deleteCommentCtrl = asyncHandler(function _callee3(req, res) {
  var comment;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Comment.findById(req.params.id));

        case 2:
          comment = _context3.sent;

          if (comment) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "comment not found"
          }));

        case 5:
          if (!(req.user.isAdmin || req.user.id === comment.user.toString())) {
            _context3.next = 11;
            break;
          }

          _context3.next = 8;
          return regeneratorRuntime.awrap(Comment.findByIdAndDelete(req.params.id));

        case 8:
          res.status(200).json({
            message: "comment has been deleted"
          });
          _context3.next = 12;
          break;

        case 11:
          res.status(403).json({
            message: "access denied, not allowed"
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
});
/**-----------------------------------------------
 * @desc    Update Comment
 * @route   /api/comments/:id
 * @method  PUT
 * @access  private (only owner of the comment)
 ------------------------------------------------*/

module.exports.updateCommentCtrl = asyncHandler(function _callee4(req, res) {
  var _validateUpdateCommen, error, comment, updatedComment;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _validateUpdateCommen = validateUpdateComment(req.body), error = _validateUpdateCommen.error;

          if (!error) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: error.details[0].message
          }));

        case 3:
          _context4.next = 5;
          return regeneratorRuntime.awrap(Comment.findById(req.params.id));

        case 5:
          comment = _context4.sent;

          if (comment) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "comment not found"
          }));

        case 8:
          if (!(req.user.id !== comment.user.toString())) {
            _context4.next = 10;
            break;
          }

          return _context4.abrupt("return", res.status(403).json({
            message: "access denied, only user himself can edit his comment"
          }));

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(Comment.findByIdAndUpdate(req.params.id, {
            $set: {
              text: req.body.text
            }
          }, {
            "new": true
          }));

        case 12:
          updatedComment = _context4.sent;
          res.status(200).json(updatedComment);

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
});
/**-----------------------------------------------
 * @desc    Create New Comment Reply
 * @route   /api/comments/reply
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/

module.exports.replyCommentCtrl = asyncHandler(function _callee5(req, res) {
  var _validateReplyComment, error, profile, comment;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _validateReplyComment = validateReplyComment(req.body), error = _validateReplyComment.error;

          if (!error) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            message: error.details[0].message
          }));

        case 3:
          _context5.next = 5;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 5:
          profile = _context5.sent;
          _context5.next = 8;
          return regeneratorRuntime.awrap(Comment.findByIdAndUpdate(req.params.id, {
            $push: {
              commentReplies: {
                postId: req.body.postId,
                text: req.body.text,
                user: req.user.id,
                username: profile.username,
                profilePhoto: profile.profilePhoto
              }
            }
          }, {
            "new": true
          }));

        case 8:
          comment = _context5.sent;
          res.status(201).json(comment);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
});
/**-----------------------------------------------
 * @desc    Delete Comment Reply
 * @route   /api/comments/reply/:id
 * @method  DELETE
 * @access  private (only admin or owner of the comment)
 ------------------------------------------------*/

module.exports.deleteCommentReplyCtrl = asyncHandler(function _callee6(req, res) {
  var replyId, comment, reply, deletedCommentReply;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          replyId = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Comment.findOne({
            "commentReplies._id": new mongoose.Types.ObjectId(replyId)
          }));

        case 3:
          comment = _context6.sent;

          if (comment) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: "Comment not found"
          }));

        case 6:
          reply = comment.commentReplies.find(function (reply) {
            return reply._id.toString() === replyId;
          });

          if (reply) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: "Reply not found"
          }));

        case 9:
          if (!(req.user.isAdmin || req.user.id === reply.user.toString())) {
            _context6.next = 16;
            break;
          }

          _context6.next = 12;
          return regeneratorRuntime.awrap(Comment.findOneAndUpdate({
            _id: comment._id
          }, {
            $pull: {
              commentReplies: {
                _id: reply._id
              }
            }
          }, {
            "new": true
          }));

        case 12:
          deletedCommentReply = _context6.sent;
          return _context6.abrupt("return", res.status(200).json(deletedCommentReply));

        case 16:
          return _context6.abrupt("return", res.status(403).json({
            message: "Access denied, not allowed"
          }));

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  });
});
/**-----------------------------------------------
 * @desc    Update Comment Reply
 * @route   /api/comments/reply/:id
 * @method  PUT
 * @access  private (only owner of the comment)
 ------------------------------------------------*/

module.exports.updateCommentReplyCtrl = asyncHandler(function _callee7(req, res) {
  var _validateUpdateCommen2, error, replyId, userId, comment, reply, updatedComment;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _validateUpdateCommen2 = validateUpdateComment(req.body), error = _validateUpdateCommen2.error;

          if (!error) {
            _context7.next = 3;
            break;
          }

          return _context7.abrupt("return", res.status(400).json({
            message: error.details[0].message
          }));

        case 3:
          replyId = req.params.id;
          userId = req.user.id;
          _context7.next = 7;
          return regeneratorRuntime.awrap(Comment.findOne({
            "commentReplies._id": new mongoose.Types.ObjectId(replyId)
          }));

        case 7:
          comment = _context7.sent;

          if (comment) {
            _context7.next = 10;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            message: "Comment not found"
          }));

        case 10:
          reply = comment.commentReplies.find(function (reply) {
            return reply._id.toString() === replyId;
          });

          if (reply) {
            _context7.next = 13;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            message: "Reply not found"
          }));

        case 13:
          if (!(reply.user.toString() !== userId)) {
            _context7.next = 15;
            break;
          }

          return _context7.abrupt("return", res.status(403).json({
            message: "Access denied, only the user who posted the reply can edit it"
          }));

        case 15:
          _context7.next = 17;
          return regeneratorRuntime.awrap(Comment.findOneAndUpdate({
            "commentReplies._id": new mongoose.Types.ObjectId(replyId)
          }, {
            $set: {
              "commentReplies.$.text": req.body.text
            }
          }, {
            "new": true
          }));

        case 17:
          updatedComment = _context7.sent;

          if (updatedComment) {
            _context7.next = 20;
            break;
          }

          return _context7.abrupt("return", res.status(500).json({
            message: "Failed to update reply"
          }));

        case 20:
          res.status(200).json(updatedComment);

        case 21:
        case "end":
          return _context7.stop();
      }
    }
  });
});