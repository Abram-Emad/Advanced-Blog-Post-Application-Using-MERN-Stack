import { Link } from "react-router-dom";
import "../../assets/styles/footer.css";

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='container'>
        <div className='links-container'>
          <ul className='main-footer social-link'>
            <li>
              <Link to='#'>
                <i className='fab fa-facebook' aria-hidden='true'></i>
              </Link>
            </li>
            <li>
              <Link to='#'>
                <i className='fa-brands fa-x-twitter'></i>
              </Link>
            </li>
            <li>
              <Link to='#'>
                <i className='fab fa-instagram' aria-hidden='true'></i>
              </Link>
            </li>
            <li>
              <Link to='#'>
                <i className='fa-brands fa-whatsapp' aria-hidden='true'></i>
              </Link>
            </li>
            <li>
              <Link to='#'>
                <i className='fa-brands fa-linkedin' aria-hidden='true'></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className='copyRights-container'>
          <div className='box-1'>
            <i className='fa-regular fa-copyright' aria-hidden='true'></i>
            <p>All rights reserved to </p>
            <Link className='designer' to='/'>
              Our Blog
            </Link>
            <p>|</p>
            <Link className='Btn' to='/privacyDataPolicy'>
              <i className='fa-solid fa-shield-halved' aria-hidden='true'></i>
              Privacy Data Policy
            </Link>
          </div>
          <div className='box-2'>
            <i className='fa-solid fa-paintbrush' aria-hidden='true'></i>
            <p>Design, programming and development: </p>
            <Link
              className='designer fw-bold'
              to='https://www.linkedin.com/in/abram-emad-mahrous/'
              id='abram-emad'>
              Abram Emad
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
