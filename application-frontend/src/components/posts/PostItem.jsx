import { Link } from "react-router-dom";

const PostItem = ({ post, username, userId }) => {
  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;

  return (
    <div className='post-item'>
      <div className='post-item-image-wrapper'>
        <img src={post?.image.url} alt='' className='post-item-image' />
      </div>
      <div className='post-item-info-wrapper'>
        <div className='post-item-info'>
          <div className='post-item-author'>
            <Link className='post-item-username' to={profileLink}>
              <i className='fa-regular fa-circle-user'></i>
              {username ? username : post?.user.username}
            </Link>
          </div>
          <div className='post-item-date'>
            <i className='fa-solid fa-calendar-days'></i>
            {new Date(post?.createdAt).toDateString()}
          </div>
        </div>
        <div className='post-item-details'>
          <h4 className='post-item-title'>
            <i className='fa-solid fa-hashtag'></i>
            {post?.title}
          </h4>
          <Link
            className='post-item-category'
            to={`/posts/categories/${post?.category}`}>
            <i className='fa-solid fa-tags'></i>
            {post?.category}
          </Link>
        </div>
        <p className='post-item-description'>{post?.description}</p>
        <Link className='post-item-link' to={`/posts/details/${post?._id}`}>
          Read More <i className='fa-solid fa-arrow-right'></i>
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
