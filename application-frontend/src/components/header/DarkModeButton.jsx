const DarkModeButton = ({ darkModeHandler, isDarkModeActivated }) => {
  return (
    <div className='dark-mode-button-container'>
      <div className='dark-mode-button'>
        <input
          type='checkbox'
          id='check'
          className='dark-mode-button-toggle'
          onChange={darkModeHandler}
          checked={isDarkModeActivated}
        />
        <label htmlFor='check'></label>
      </div>
    </div>
  );
};

export default DarkModeButton;
