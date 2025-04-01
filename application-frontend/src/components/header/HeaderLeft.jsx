const HeaderLeft = ({ toggle, setToggle }) => {
  return (
    <div className='header-left'>
      <div className='header-logo'>
        <strong>BLOG</strong>
        <i className='fa-solid fa-pencil'></i>
      </div>
      <div onClick={() => setToggle((prev) => !prev)} className='header-menu'>
        {toggle ? (
          <i className='fa-regular fa-circle-xmark'></i>
        ) : (
          <i className='fa-regular fa-rectangle-list'></i>
        )}
      </div>
    </div>
  );
};

export default HeaderLeft;
