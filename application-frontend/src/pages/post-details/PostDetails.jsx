import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import "../../assets/styles/post-details.css";
import { toast } from "react-toastify";
import Sidebar from "../../components/sidebar/Sidebar";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import PostShareButtons from "../../components/posts/PostShareButtons";
import swal from "sweetalert";
import UpdatePostModal from "../../components/posts/UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCall";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();
  const location = useLocation();

  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  };

  const navigate = useNavigate();

  // Delete Post Handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  return (
    <section className='post-details-container'>
      <div className='post-details'>
        <h1 className='post-details-title'>
          <i className='fa-solid fa-hashtag'></i>
          {post?.title}
        </h1>
        <div className='post-details-image-wrapper'>
          <img
            src={file ? URL.createObjectURL(file) : post?.image.url}
            alt=''
            className='post-details-image'
          />
          {user?._id === post?.user?._id && (
            <form
              onSubmit={updateImageSubmitHandler}
              className='update-post-image-form'>
              <label htmlFor='file' className='update-post-label'>
                <i className='bi bi-image-fill'></i>
                Select new image
              </label>
              <input
                style={{ display: "none" }}
                type='file'
                name='file'
                id='file'
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type='submit'>upload</button>
            </form>
          )}
        </div>
        <p className='post-details-description'>{post?.description}</p>
        <div className='post-details-user-info'>
          <img
            src={post?.user.profilePhoto?.url}
            alt=''
            className='post-details-user-image'
          />
          <div className='post-details-user'>
            <strong>
              <Link to={`/profile/${post?.user._id}`}>
                <i className='fa-regular fa-circle-user'></i>
                {post?.user.username}
              </Link>
            </strong>
            <span>
              <i className='fa-solid fa-calendar-days'></i>
              {new Date(post?.createdAt).toDateString()}
            </span>
            {post?.user.bio && <p>{post?.user.bio}</p>}
          </div>
        </div>
        <div className='post-details-icon-wrapper'>
          <div>
            {user && (
              <i
                onClick={() => dispatch(toggleLikePost(post?._id))}
                className={
                  post?.likes.includes(user?._id)
                    ? "bi bi-hand-thumbs-up-fill"
                    : "bi bi-hand-thumbs-up"
                }></i>
            )}
            <small>{post?.likes.length} likes</small>
          </div>
          {user?._id === post?.user?._id && (
            <div>
              <i
                onClick={() => setUpdatePost(true)}
                className='fa-solid fa-pen-to-square'></i>
              <i
                onClick={deletePostHandler}
                className='fa-regular fa-trash-can'></i>
            </div>
          )}
        </div>
        <PostShareButtons
          postUrl={location.pathname}
          postTitle={post?.title}
          postImage={post?.image.url}
        />
        <CommentList comments={post?.comments} postId={post?._id} />
        {user ? (
          <AddComment postId={post?._id} />
        ) : (
          <p className='post-details-info-write'>
            to write a comment you should login first
          </p>
        )}
        {updatePost && (
          <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
        )}
      </div>
      <Sidebar />
    </section>
  );
};

export default PostDetails;
