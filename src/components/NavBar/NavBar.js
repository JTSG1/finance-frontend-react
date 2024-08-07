import { Link } from 'react-router-dom';

const NavBar = ({ appName }) => {

    return (
        <nav className="p-3 navbar">
          <Link to="/" className="nav-link">{ appName }</Link>
        </nav>
        
    )

}

export default NavBar;
