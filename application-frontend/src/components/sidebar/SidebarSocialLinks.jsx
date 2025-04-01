import { Link } from "react-router-dom";
import "../../assets/styles/sidebar-social-links.css";
const socialLinks = [
  {
    platform: "facebook",
    url: "#",
    count: "579",
    text: "Fan",
  },
  {
    platform: "x-twitter",
    url: "#",
    count: "2",
    text: "Follower",
  },
  {
    platform: "instagram",
    url: "#+",
    count: "73",
    text: "Follower",
  },
  {
    platform: "youtube",
    url: "#",
    count: "535",
    text: "Subscriber",
  },
  { platform: "pinterest", url: "#", count: "120", text: "Follower" },
  { platform: "linkedin", url: "#", count: "10k", text: "Follower" },
];

const SidebarSocialLinks = () => {
  return (
    <div className='social-counter sidebar section' id='social-counter'>
      <ul id='social'>
        {socialLinks.map(({ platform, url, count, text }) => (
          <li key={platform} className={`social-item ${platform}`}>
            <Link to={url} target='_blank' rel='noopener noreferrer'>
              <i
                className={`item-icon fa-brands fa-${platform}`}
                aria-hidden='true'></i>
              <span className='item-count'>{count}</span>
              <span className='item-text'>{text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SidebarSocialLinks;
