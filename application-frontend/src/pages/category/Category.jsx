import { useParams, Link } from "react-router-dom";
import "../../assets/styles/category.css";
import PostItemSliderShow from "../../components/posts/PostItemSliderShow";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsBasedOnCategory,
  fetchPosts,
} from "../../redux/apiCalls/postApiCall";

const Category = () => {
  const dispatch = useDispatch();
  const { postsCate, posts } = useSelector((state) => state.post);

  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [dispatch, category]);

  return (
    <>
      <PostItemSliderShow posts={posts} />
      <section className='category'>
        <div className='finded-category'>
          {postsCate.length === 0 ? (
            <>
              <h1 className='category-not-found'>
                Posts with <span>{category}</span> category not found
              </h1>
              <Link to='/posts' className='category-not-found-link'>
                Go to posts page
              </Link>
            </>
          ) : (
            <>
              <h1 className='category-title'>Posts based on {category}</h1>
              <PostList posts={postsCate} />
            </>
          )}
        </div>
        <Sidebar />
      </section>
    </>
  );
};

export default Category;
