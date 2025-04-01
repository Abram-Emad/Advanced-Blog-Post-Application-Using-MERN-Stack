"use strict";

var fs = require("fs");

var path = require("path");

var asyncHandler = require("express-async-handler");

var _require = require("../models/Post"),
    Post = _require.Post,
    validateCreatePost = _require.validateCreatePost,
    validateUpdatePost = _require.validateUpdatePost;

var _require2 = require("../utils/cloudinary"),
    cloudinaryUploadImage = _require2.cloudinaryUploadImage,
    cloudinaryRemoveImage = _require2.cloudinaryRemoveImage;

var _require3 = require("../models/Comment"),
    Comment = _require3.Comment;
/**-----------------------------------------------
 * @desc    Create New Post
 * @route   /api/posts
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/


module.exports.createPostCtrl = asyncHandler(function _callee(req, res) {
  var _validateCreatePost, error, imagePath, result, post;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.file) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "no image provided"
          }));

        case 2:
          _validateCreatePost = validateCreatePost(req.body), error = _validateCreatePost.error;

          if (!error) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: error.details[0].message
          }));

        case 5:
          imagePath = path.join(__dirname, "../images/".concat(req.file.filename));
          _context.next = 8;
          return regeneratorRuntime.awrap(cloudinaryUploadImage(imagePath));

        case 8:
          result = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(Post.create({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            user: req.user.id,
            image: {
              url: result.secure_url,
              publicId: result.public_id
            }
          }));

        case 11:
          post = _context.sent;
          res.status(201).json(post);
          fs.unlinkSync(imagePath);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
});
/**-----------------------------------------------
 * @desc    Get All Posts
 * @route   /api/posts
 * @method  GET
 * @access  public
 ------------------------------------------------*/

module.exports.getAllPostsCtrl = asyncHandler(function _callee2(req, res) {
  var POST_PER_PAGE, _req$query, pageNumber, category, searchText, posts;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          POST_PER_PAGE = 3;
          _req$query = req.query, pageNumber = _req$query.pageNumber, category = _req$query.category, searchText = _req$query.searchText;

          if (!pageNumber) {
            _context2.next = 8;
            break;
          }

          _context2.next = 5;
          return regeneratorRuntime.awrap(Post.find().skip((pageNumber - 1) * POST_PER_PAGE).limit(POST_PER_PAGE).sort({
            createdAt: -1
          }).populate("user", ["-password"]));

        case 5:
          posts = _context2.sent;
          _context2.next = 23;
          break;

        case 8:
          if (!category) {
            _context2.next = 14;
            break;
          }

          _context2.next = 11;
          return regeneratorRuntime.awrap(Post.find({
            category: category
          }).sort({
            createdAt: -1
          }).populate("user", ["-password"]));

        case 11:
          posts = _context2.sent;
          _context2.next = 23;
          break;

        case 14:
          if (!searchText) {
            _context2.next = 20;
            break;
          }

          _context2.next = 17;
          return regeneratorRuntime.awrap(Post.find({
            title: {
              $regex: searchText,
              $options: "i"
            }
          }).sort({
            createdAt: -1
          }).populate("user", ["-password"]));

        case 17:
          posts = _context2.sent;
          _context2.next = 23;
          break;

        case 20:
          _context2.next = 22;
          return regeneratorRuntime.awrap(Post.find().sort({
            createdAt: -1
          }).populate("user", ["-password"]));

        case 22:
          posts = _context2.sent;

        case 23:
          res.status(200).json(posts);

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  });
});
/**-----------------------------------------------
 * @desc    Get Single Post
 * @route   /api/posts/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/

module.exports.getSinglePostCtrl = asyncHandler(function _callee3(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Post.findById(req.params.id).populate("user", ["-password"]).populate("comments"));

        case 2:
          post = _context3.sent;

          if (post) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "post not found"
          }));

        case 5:
          res.status(200).json(post);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
/**-----------------------------------------------
 * @desc    Get Posts Count
 * @route   /api/posts/count
 * @method  GET
 * @access  public
 ------------------------------------------------*/

module.exports.getPostCountCtrl = asyncHandler(function _callee4(req, res) {
  var count;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Post.countDocuments());

        case 2:
          count = _context4.sent;
          res.status(200).json(count);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
/**-----------------------------------------------
 * @desc    Delete Post
 * @route   /api/posts/:id
 * @method  DELETE
 * @access  private (only admin or owner of the post)
 ------------------------------------------------*/

module.exports.deletePostCtrl = asyncHandler(function _callee5(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 2:
          post = _context5.sent;

          if (post) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: "post not found"
          }));

        case 5:
          if (!(req.user.isAdmin || req.user.id === post.user.toString())) {
            _context5.next = 15;
            break;
          }

          _context5.next = 8;
          return regeneratorRuntime.awrap(Post.findByIdAndDelete(req.params.id));

        case 8:
          _context5.next = 10;
          return regeneratorRuntime.awrap(cloudinaryRemoveImage(post.image.publicId));

        case 10:
          _context5.next = 12;
          return regeneratorRuntime.awrap(Comment.deleteMany({
            postId: post._id
          }));

        case 12:
          res.status(200).json({
            message: "post has been deleted successfully",
            postId: post._id
          });
          _context5.next = 16;
          break;

        case 15:
          res.status(403).json({
            message: "access denied, forbidden"
          });

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  });
});
/**-----------------------------------------------
 * @desc    Update Post
 * @route   /api/posts/:id
 * @method  PUT
 * @access  private (only owner of the post)
 ------------------------------------------------*/

module.exports.updatePostCtrl = asyncHandler(function _callee6(req, res) {
  var _validateUpdatePost, error, post, updatedPost;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _validateUpdatePost = validateUpdatePost(req.body), error = _validateUpdatePost.error;

          if (!error) {
            _context6.next = 3;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            message: error.details[0].message
          }));

        case 3:
          _context6.next = 5;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 5:
          post = _context6.sent;

          if (post) {
            _context6.next = 8;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: "post not found"
          }));

        case 8:
          if (!(req.user.id !== post.user.toString())) {
            _context6.next = 10;
            break;
          }

          return _context6.abrupt("return", res.status(403).json({
            message: "access denied, you are not allowed"
          }));

        case 10:
          _context6.next = 12;
          return regeneratorRuntime.awrap(Post.findByIdAndUpdate(req.params.id, {
            $set: {
              title: req.body.title,
              description: req.body.description,
              category: req.body.category
            }
          }, {
            "new": true
          }).populate("user", ["-password"]).populate("comments"));

        case 12:
          updatedPost = _context6.sent;
          res.status(200).json(updatedPost);

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  });
});
/**-----------------------------------------------
 * @desc    Update Post Image
 * @route   /api/posts/upload-image/:id
 * @method  PUT
 * @access  private (only owner of the post)
 ------------------------------------------------*/

module.exports.updatePostImageCtrl = asyncHandler(function _callee7(req, res) {
  var post, imagePath, result, updatedPost;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (req.file) {
            _context7.next = 2;
            break;
          }

          return _context7.abrupt("return", res.status(400).json({
            message: "no image provided"
          }));

        case 2:
          _context7.next = 4;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 4:
          post = _context7.sent;

          if (post) {
            _context7.next = 7;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            message: "post not found"
          }));

        case 7:
          if (!(req.user.id !== post.user.toString())) {
            _context7.next = 9;
            break;
          }

          return _context7.abrupt("return", res.status(403).json({
            message: "access denied, you are not allowed"
          }));

        case 9:
          _context7.next = 11;
          return regeneratorRuntime.awrap(cloudinaryRemoveImage(post.image.publicId));

        case 11:
          imagePath = path.join(__dirname, "../images/".concat(req.file.filename));
          _context7.next = 14;
          return regeneratorRuntime.awrap(cloudinaryUploadImage(imagePath));

        case 14:
          result = _context7.sent;
          _context7.next = 17;
          return regeneratorRuntime.awrap(Post.findByIdAndUpdate(req.params.id, {
            $set: {
              image: {
                url: result.secure_url,
                publicId: result.public_id
              }
            }
          }, {
            "new": true
          }));

        case 17:
          updatedPost = _context7.sent;
          res.status(200).json(updatedPost);
          fs.unlinkSync(imagePath);

        case 20:
        case "end":
          return _context7.stop();
      }
    }
  });
});
/**-----------------------------------------------
 * @desc    Toggle Like
 * @route   /api/posts/like/:id
 * @method  PUT
 * @access  private (only logged in user)
 ------------------------------------------------*/

module.exports.toggleLikeCtrl = asyncHandler(function _callee8(req, res) {
  var loggedInUser, postId, post, isPostAlreadyLiked;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          loggedInUser = req.user.id;
          postId = req.params.id;
          _context8.next = 4;
          return regeneratorRuntime.awrap(Post.findById(postId));

        case 4:
          post = _context8.sent;

          if (post) {
            _context8.next = 7;
            break;
          }

          return _context8.abrupt("return", res.status(404).json({
            message: "post not found"
          }));

        case 7:
          isPostAlreadyLiked = post.likes.find(function (user) {
            return user.toString() === loggedInUser;
          });

          if (!isPostAlreadyLiked) {
            _context8.next = 14;
            break;
          }

          _context8.next = 11;
          return regeneratorRuntime.awrap(Post.findByIdAndUpdate(postId, {
            $pull: {
              likes: loggedInUser
            }
          }, {
            "new": true
          }));

        case 11:
          post = _context8.sent;
          _context8.next = 17;
          break;

        case 14:
          _context8.next = 16;
          return regeneratorRuntime.awrap(Post.findByIdAndUpdate(postId, {
            $push: {
              likes: loggedInUser
            }
          }, {
            "new": true
          }));

        case 16:
          post = _context8.sent;

        case 17:
          res.status(200).json(post);

        case 18:
        case "end":
          return _context8.stop();
      }
    }
  });
});