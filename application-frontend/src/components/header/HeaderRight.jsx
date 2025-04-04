import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import { setDarkMode } from "../../redux/apiCalls/profileApiCall";
import SearchTextModal from "./SearchTextModal";
import DarkModeButton from "./DarkModeButton";

const HeaderRight = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [dropdown, setDropdown] = useState(false);
  const [searchTextModal, setSearchTextModal] = useState(false);

  // Logout Handler
  const logoutHandler = () => {
    setDropdown(false);
    dispatch(logoutUser());
  };

  // Dark Mode Handler
  const darkModeHandler = () => {
    dispatch(setDarkMode());
  };

  return (
    <div className='header-right'>
      {user ? (
        <>
          <div className='header-right-user-info'>
            <DarkModeButton
              isDarkModeActivated={user?.darkMode}
              darkModeHandler={darkModeHandler}
            />
            <span
              onClick={() => setDropdown((prev) => !prev)}
              className='header-right-username'>
              <i className='fa-solid fa-chevron-down'></i>
              {user?.username}
            </span>
            <img
              src={user?.profilePhoto.url}
              alt={user?.username}
              className='header-right-user-photo'
            />
            {dropdown && (
              <div className='header-right-dropdown'>
                <Link
                  to={`/profile/${user?._id}`}
                  className='header-dropdown-item'
                  onClick={() => setDropdown(false)}>
                  <i className='fa-regular fa-address-card'></i>
                  <span>Profile</span>
                </Link>
                <div onClick={logoutHandler} className='header-dropdown-item'>
                  <i className='fa-solid fa-right-from-bracket'></i>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to='/login' className='header-right-link'>
            <i className='bi bi-box-arrow-in-right'></i>
            <span>Login</span>
          </Link>
          <Link to='/register' className='header-right-link'>
            <i className='bi bi-person-plus'></i>
            <span>Register</span>
          </Link>
        </>
      )}
      <button className='search-for-post'>
        <i
          onClick={() => setSearchTextModal(true)}
          className='fa-solid fa-magnifying-glass'></i>
      </button>
      {searchTextModal && (
        <SearchTextModal setSearchTextModal={setSearchTextModal} />
      )}
    </div>
  );
};

export default HeaderRight;
