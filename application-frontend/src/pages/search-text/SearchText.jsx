import { useParams, Link } from "react-router-dom";
import "../../assets/styles/search-text.css";
import PostItemSliderShow from "../../components/posts/PostItemSliderShow";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsBasedOnSearchText,
  fetchPosts,
} from "../../redux/apiCalls/postApiCall";

const SearchText = () => {
  const dispatch = useDispatch();
  const { postsWithSearchText, posts } = useSelector((state) => state.post);

  const { searchText } = useParams();

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPostsBasedOnSearchText(searchText));
    window.scrollTo(0, 0);
  }, [dispatch, searchText]);

  return (
    <>
      <PostItemSliderShow posts={posts} />
      <section className='search-text'>
        <div className='finded-search-text'>
          {postsWithSearchText.length === 0 ? (
            <>
              <h1 className='search-text-not-found'>
                Posts with <span>{searchText}</span> search-text not found
              </h1>
              <Link to='/posts' className='search-text-not-found-link'>
                Go to posts page
              </Link>
            </>
          ) : (
            <>
              <h1 className='search-text-title'>Posts based on {searchText}</h1>
              <PostList posts={postsWithSearchText} />
            </>
          )}
        </div>
        <Sidebar />
      </section>
    </>
  );
};

export default SearchText;
