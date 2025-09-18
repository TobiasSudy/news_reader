import { Link, useLocation } from 'react-router-dom';
import '../css/NavBar.css';

const NavBar = () => {
    const location = useLocation();
    return (
        <nav className="navbar">
            <div className="navbar-title">
                News App
            </div>
            <div className="navbar-buttons">
                <Link
                    to="/news"
                    className={`navbar-link${location.pathname === '/news' ? ' active' : ''}`}
                >
                    News
                </Link>
                <Link
                    to="/categories"
                    className={`navbar-link${location.pathname === '/categories' ? ' active' : ''}`}
                >
                    Kategorien
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;