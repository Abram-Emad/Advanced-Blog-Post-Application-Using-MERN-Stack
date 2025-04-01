import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className='admin-sidebar'>
      <Link to='/admin-dashboard' className='admin-sidebar-title'>
        <i className='fa-regular fa-rectangle-list'></i>
        Dashboard
      </Link>
      <ul className='admin-dashboard-list'>
        <Link className='admin-sidebar-link' to='/admin-dashboard/users-table'>
          <i className='fa-regular fa-circle-user'></i>
          Users
        </Link>
        <Link className='admin-sidebar-link' to='/admin-dashboard/posts-table'>
          <i className='fa-regular fa-rectangle-list'></i>
          Posts
        </Link>
        <Link
          className='admin-sidebar-link'
          to='/admin-dashboard/categories-table'>
          <i className='fa-solid fa-tags'></i>
          Categories
        </Link>
        <Link
          className='admin-sidebar-link'
          to='/admin-dashboard/comments-table'>
          <i className='fa-regular fa-comments'></i>
          Comments
        </Link>
      </ul>
    </div>
  );
};

export default AdminSidebar;
