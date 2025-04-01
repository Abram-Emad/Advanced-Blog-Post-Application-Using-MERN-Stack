import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../assets/styles/post-slider-show.css";

const PostItemSliderShow = ({ posts }) => {
  return (
    <div className='post-slider-show'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000 }}
        loop={true}
        className='post-slider'>
        {posts.map((post) => {
          const profileLink = `/profile/${post?.user?._id}`;
          return (
            <SwiperSlide key={post._id}>
              <div className='post-slider-show-item'>
                <div className='post-slider-show-item-image-wrapper'>
                  <img
                    src={post?.image?.url}
                    alt=''
                    className='post-slider-show-item-image'
                  />
                </div>
                <div className='post-slider-show-item-info-wrapper'>
                  <div className='post-slider-show-item-info'>
                    <div className='post-slider-show-item-author'>
                      <Link
                        className='post-slider-show-item-username'
                        to={profileLink}>
                        <i className='fa-regular fa-circle-user'></i>
                        {post?.user?.username}
                      </Link>
                    </div>
                    <div className='post-slider-show-item-date'>
                      <i className='fa-solid fa-calendar-days'></i>
                      {new Date(post?.createdAt).toDateString()}
                    </div>
                    <Link
                      className='post-slider-show-item-category'
                      to={`/posts/categories/${post?.category}`}>
                      <i className='fa-solid fa-tags'></i>
                      {post?.category}
                    </Link>
                  </div>
                  <div className='post-slider-show-item-details'>
                    <Link
                      className='post-slider-show-item-title'
                      to={`/posts/details/${post?._id}`}>
                      <i className='fa-solid fa-hashtag'></i>
                      {post?.title}
                    </Link>
                    <p className='post-slider-show-item-description'>
                      {post?.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default PostItemSliderShow;
