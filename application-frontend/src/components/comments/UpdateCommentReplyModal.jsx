import { useState } from "react";
import "../../assets/styles/update-comment.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateCommentReply } from "../../redux/apiCalls/commentApiCall";

const UpdateCommentReplyModal = ({ setUpdateCommentReply, commentReplyForUpdate }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState(commentReplyForUpdate?.text);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Please write something");

    dispatch(updateCommentReply(commentReplyForUpdate?._id, { text }));
    setUpdateCommentReply(false);
  };

  return (
    <div className='update-comment'>
      <form onSubmit={formSubmitHandler} className='update-post-form'>
        <abbr title='close'>
          <i
            onClick={() => setUpdateCommentReply(false)}
            className='fa-regular fa-circle-xmark update-comment-form-close'></i>
        </abbr>
        <h1 className='update-comment-title'>Edit Comment Reply</h1>
        <input
          type='text'
          className='update-comment-input'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type='submit' className='update-comment-btn'>
          Edit Comment Reply
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentReplyModal;
