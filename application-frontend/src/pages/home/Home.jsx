import PostList from "../../components/posts/PostList";
import "../../assets/styles/home.css";
import PostItemSliderShow from "../../components/posts/PostItemSliderShow";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, [dispatch]);

  return (
    <section className='home'>
      <PostItemSliderShow posts={posts} />
      <div className='home-latest-post'>Latest Posts</div>
      <div className='home-container'>
        <PostList posts={posts} />
        <Sidebar />
      </div>
      <div className='home-see-posts-link'>
        <Link to='/posts' className='home-link'>
          See All Posts
        </Link>
      </div>
    </section>
  );
};

export default Home;
