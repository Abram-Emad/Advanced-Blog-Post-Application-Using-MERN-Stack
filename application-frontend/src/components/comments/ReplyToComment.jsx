import "../../assets/styles/add-comment.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { replyToComment } from "../../redux/apiCalls/commentApiCall";

const ReplyToComment = ({ commentId, postId, setReplyToComment }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Please write something");

    dispatch(replyToComment(commentId, { postId, text }));
    setText("");
    setReplyToComment(null);
  };

  return (
    <form onSubmit={formSubmitHandler} className='add-comment'>
      <input
        type='text'
        placeholder='Add a comment'
        className='add-comment-input'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type='submit' className='add-comment-btn'>
        Reply
      </button>
    </form>
  );
};

export default ReplyToComment;
