import AdminSidebar from "../../components/admin/AdminSidebar";
import "../../assets/styles/admin-table.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteComment,
  deleteCommentReply,
  fetchAllComments,
} from "../../redux/apiCalls/commentApiCall";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchAllComments());
  }, [dispatch]);

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
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
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCommentReply(commentId));
      }
    });
  };

  return (
    <section className='table-container'>
      <AdminSidebar />
      <div className='table-wrapper'>
        <h1 className='table-title'>Comments</h1>
        <table className='table'>
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(comments) && comments.flatMap((comment, commentIndex) => [
              <tr key={comment._id}>
                <td>{commentIndex + 1}</td>
                <td>
                  <div className='table-image'>
                    <img
                      src={comment.user.profilePhoto?.url}
                      alt=''
                      className='table-user-image'
                    />
                    <span className='table-username'>
                      {comment.user.username}
                    </span>
                  </div>
                </td>
                <td>{comment.text}</td>
                <td>
                  <div className='table-button-group'>
                    <button onClick={() => deleteCommentHandler(comment._id)}>
                      Delete Comment
                    </button>
                  </div>
                </td>
              </tr>,
              ...(comment?.commentReplies).map((reply, replyIndex) => (
                <tr key={reply._id}>
                  <td>{`${commentIndex + 1}.${replyIndex + 1}`}</td>
                  <td>
                    <div className='table-image'>
                      <img
                        src={reply.profilePhoto?.url}
                        alt=''
                        className='table-user-image'
                      />
                      <span className='table-username'>{reply.username}</span>
                    </div>
                  </td>
                  <td>{reply.text}</td>
                  <td>
                    <div className='table-button-group'>
                      <button
                        onClick={() => deleteCommentReplyHandler(reply._id)}>
                        Delete Comment
                      </button>
                    </div>
                  </td>
                </tr>
              )),
            ])}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CommentsTable;
