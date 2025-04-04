import { Link } from "react-router-dom";
import "../../assets/styles/post-share-buttons.css";

const PostShareButtons = ({ postUrl, postImage, postTitle }) => {

  const openPopup = (url) => {
    window.open(url, "sharer", "toolbar=0,status=0,width=626,height=436");
  };

  return (
    <div className='Post-Share-Buttons'>
      <h2 className='Post-Share-Description'>
        If you like our topic please feel free to share it on :
      </h2>

      <Link
        className='share-facebook'
        to={`http://www.facebook.com/share.php?v=4&u=${postUrl}&t=${postTitle}`}
        onClick={(e) => {
          e.preventDefault();
          openPopup(
            `http://www.facebook.com/share.php?v=4&u=${postUrl}&t=${postTitle}`
          );
        }}
        rel='nofollow'
        target='_blank'
        title='نشر علي فيسبوك'>
        Facebook
        <span>Facebook</span>
      </Link>

      <Link
        className='share-x-twitter'
        to={`https://twitter.com/intent/tweet?url=${postUrl}`}
        onClick={(e) => {
          e.preventDefault();
          openPopup(`https://twitter.com/intent/tweet?url=${postUrl}`);
        }}
        rel='nofollow'
        target='_blank'
        title='تغريد علي تويتر'>
        x-twitter
        <span>x-twitter</span>
      </Link>

      <Link
        className='share-Pinterest'
        to={`https://pinterest.com/pin/create/button/?url=${postUrl}&media=${
          postImage || ".png"
        }&description=${postTitle}`}
        onClick={(e) => {
          e.preventDefault();
          openPopup(
            `https://pinterest.com/pin/create/button/?url=${postUrl}&media=${
              postImage || ".png"
            }&description=${postTitle}`
          );
        }}
        rel='nofollow'
        target='_blank'
        title='حفظ علي بنترست'>
        Pinterest
        <span>Pinterest</span>
      </Link>

      <Link
        className='share-linkedin'
        to={`https://linkedin.com/sharing/share-offsite/?url=${postUrl}`}
        onClick={(e) => {
          e.preventDefault();
          openPopup(
            `https://linkedin.com/sharing/share-offsite/?url=${postUrl}`
          );
        }}
        rel='nofollow'
        target='_blank'
        title='مشلركة علي لينكد إن'>
        LinkedIn
        <span>LinkedIn</span>
      </Link>

      <Link
        className='whatsapp'
        to='whatsapp://send'
        data-to={postUrl}
        data-text={postTitle}
        title='مشاركة علي واتساب'
        onClick={(e) => {
          e.preventDefault();
          if (!/android|iphone|mobile/i.test(navigator.userAgent)) {
            alert(
              "نحن اسفون ولكن لا يمكنك مشاركة هذا الموضوع على ال Whats-app عن طريق حاسوبك الشخصى بل عليك استخدام هاتفك الجوال لتتم عملية المشاركة على ال Whats-app !"
            );
          }
        }}>
        Whatsapp
        <span>Whatsapp</span>
      </Link>

      <Link
        className='share-Print'
        to='#'
        onClick={() => window.print()}
        title='اطبع المقال الان'>
        Print
        <span>Print</span>
      </Link>
    </div>
  );
};

export default PostShareButtons;
