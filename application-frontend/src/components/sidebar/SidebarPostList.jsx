import SidebarPostItem from "./SidebarPostItem";
import "../../assets/styles/sidebar-posts-list.css";

const SidebarPostList = ({posts}) => {
    return (
        <div className='post-list'>
          {posts.map((item) => (
            <SidebarPostItem post={item} key={item._id} />
          ))}
        </div>
      );
    };
    

export default SidebarPostList
