import "../../assets/styles/comment-list.css";
import swal from "sweetalert";
import { useState } from "react";
import UpdateCommentModal from "./UpdateCommentModal";
import UpdateCommentReplyModal from "./UpdateCommentReplyModal";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  deleteCommentReply,
} from "../../redux/apiCalls/commentApiCall";
import ReplyToComment from "./ReplyToComment";

const CommentList = ({ postId, comments }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);
  const [replyToComment, setReplyToComment] = useState(null);
  const [updateCommentReply, setUpdateCommentReply] = useState(false);
  const [commentReplyForUpdate, setcommentReplyForUpdate] = useState(null);

  // Update Comment Handler
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  // Update Comment Reply Handler
  const updateCommentReplyHandler = (comment) => {
    setcommentReplyForUpdate(comment);
    setUpdateCommentReply(true);
  };

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  // Delete Comment Reply Handler
  const deleteCommentReplyHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCommentReply(commentId));
      }
    });
  };

  return (
    <div className='comment-list'>
      <h4 className='comment-list-count'>
        {comments?.length +
          comments?.reduce(
            (acc, comment) => acc + comment?.commentReplies.length,
            0
          )}
        Comments
      </h4>
      {comments?.map((comment, index) => (
        <div key={comment._id} className='comment-item'>
          <div className='comment-item-info'>
            <div className='comment-item-image-wrapper'>
              <img
                src={comment.profilePhoto?.url}
                alt=''
                className='comment-item-image'
              />
            </div>
            <div className='comment-item-username'>
              <i className='fa-regular fa-circle-user'></i>
              {comment.username}
            </div>
            <div className='comment-item-time'>
              <i className='fa-regular fa-clock'></i>
              <Moment fromNow ago>
                {comment.createdAt}
              </Moment>
              ago
            </div>
          </div>
          <p className='comment-item-text'>{comment.text}</p>
          <div className='comment-reply-item-wrapper'>
            {comment?.commentReplies.map((reply, index) => {
              return (
                <div key={index} className='comment-reply-item'>
                  <div className='comment-reply-item-info'>
                    <div className='comment-reply-item-image-wrapper'>
                      <img
                        src={reply.profilePhoto?.url}
                        alt=''
                        className='comment-reply-item-image'
                      />
                    </div>
                    <div className='comment-reply-item-username'>
                      <i className='fa-regular fa-circle-user'></i>
                      {reply.username}
                    </div>
                    <div className='comment-reply-item-time'>
                      <i className='fa-regular fa-clock'></i>
                      <Moment fromNow ago>
                        {reply.createdAt}
                      </Moment>
                      ago
                    </div>
                  </div>
                  <p className='comment-reply-item-text'>{reply.text}</p>
                  {user?._id === reply.user && (
                    <div className='comment-reply-item-icon-wrapper'>
                      <i
                        onClick={() => updateCommentReplyHandler(reply)}
                        className='fa-solid fa-pen-to-square'></i>
                      <i
                        onClick={() => deleteCommentReplyHandler(reply?._id)}
                        className='fa-regular fa-trash-can'></i>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button
            key={index}
            className='reply-to-comment'
            onClick={() => setReplyToComment(comment?._id)}>
            Reply
          </button>
          {replyToComment === comment?._id && (
            <ReplyToComment
              key={comment?._id}
              commentId={comment?._id}
              postId={postId}
              setReplyToComment={setReplyToComment}
            />
          )}
          {user?._id === comment.user && (
            <div className='comment-item-icon-wrapper'>
              <i
                onClick={() => updateCommentHandler(comment)}
                className='fa-solid fa-pen-to-square'></i>
              <i
                onClick={() => deleteCommentHandler(comment?._id)}
                className='fa-regular fa-trash-can'></i>
            </div>
          )}
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModal
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
      {updateCommentReply && (
        <UpdateCommentReplyModal
          commentReplyForUpdate={commentReplyForUpdate}
          setUpdateCommentReply={setUpdateCommentReply}
        />
      )}
    </div>
  );
};

export default CommentList;
