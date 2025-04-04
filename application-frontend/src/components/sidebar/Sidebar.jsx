import { Link } from "react-router-dom";
import "../../assets/styles/sidebar.css";
import SidebarPostList from "./SidebarPostList";
import SidebarSocialLinks from "./SidebarSocialLinks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPosts(1));
  }, [dispatch]);

  return (
    <section className='sidebar'>
      <h5 className='container-title'>CATEGORIES</h5>
      <div className='sidebar-first-container'>
        <ul className='sidebar-links'>
          {categories.map((category) => (
            <Link
              className='sidebar-link'
              key={category._id}
              to={`/posts/categories/${category.title}`}>
              {category.title} <i className='fa-solid fa-tags'></i>
            </Link>
          ))}
        </ul>
      </div>
      <h5 className='container-title'>Latest Posts</h5>
      <div className='sidebar-second-container'>
        <SidebarPostList posts={posts} />
      </div>
      <h5 className='container-title'>Social Networking Sites</h5>
      <div className='sidebar-third-container'>
        <SidebarSocialLinks />
      </div>
    </section>
  );
};

export default Sidebar;
