import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/search-text-modal.css";
import { toast } from "react-toastify";

const SearchTextModal = ({ setSearchTextModal }) => {

  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (searchText.trim() === "") return toast.error("Please write something");

    navigate(`/posts/search/${searchText}`);
    setSearchTextModal(false);
  };

  return (
    <div className='search-text-modal'>
      <form onSubmit={formSubmitHandler} className='search-text-modal-form'>
        <abbr title='close'>
          <i
            onClick={() => setSearchTextModal(false)}
            className='fa-regular fa-circle-xmark search-text-modal-form-close'></i>
        </abbr>
        <h1 className='search-text-modal-title'>Search For A Post</h1>
        <input
          type='text'
          className='search-text-modal-input'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type='submit' className='search-text-modal-btn'>
        Search
        </button>
      </form>
    </div>
  );
};

export default SearchTextModal;
