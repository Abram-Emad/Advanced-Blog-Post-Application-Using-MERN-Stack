const router = require("express").Router();
const {
  createCommentCtrl,
  getAllCommentsCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
  replyCommentCtrl,
  updateCommentReplyCtrl,deleteCommentReplyCtrl,
} = require("../controllers/commentsController");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

// /api/comments
router
  .route("/")
  .post(verifyToken, createCommentCtrl)
  .get(verifyTokenAndAdmin, getAllCommentsCtrl);

// /api/comments/:id
router
  .route("/:id")
  .delete(validateObjectId, verifyToken, deleteCommentCtrl)
  .put(validateObjectId, verifyToken, updateCommentCtrl);

// /api/comments/reply/:id
router
  .route("/reply/:id")
  .post(validateObjectId, verifyToken, replyCommentCtrl)
  .put(validateObjectId, verifyToken, updateCommentReplyCtrl)
  .delete(validateObjectId, verifyToken, deleteCommentReplyCtrl);

module.exports = router;
