import { Link } from "react-router-dom";

const SidebarPostItem = ({ post, username, userId }) => {
  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;

  return (
    <div className='sidebar-post-item'>
      <div className='sidebar-post-item-image-wrapper'>
        <img src={post?.image.url} alt='' className='sidebar-post-item-image' />
      </div>
      <Link
        className='sidebar-post-item-title'
        to={`/posts/details/${post?._id}`}>
        <i className='fa-solid fa-hashtag'></i>
        {post?.title}
      </Link>
      <div className='sidebar-post-item-info-wrapper'>
        <div className='sidebar-post-item-info'>
          <div className='sidebar-post-item-author'>
            <Link className='sidebar-post-item-username' to={profileLink}>
              <i className='fa-regular fa-circle-user'></i>
              {username ? username : post?.user.username}
            </Link>
          </div>
          <div className='sidebar-post-item-date'>
            <i className='fa-solid fa-calendar-days'></i>
            {new Date(post?.createdAt).toDateString()}
          </div>
        </div>
        <div className='sidebar-post-item-details'>
          <Link
            className='sidebar-post-item-category'
            to={`/posts/categories/${post?.category}`}>
            <i className='fa-solid fa-tags'></i>
            {post?.category}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarPostItem;
