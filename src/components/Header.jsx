import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { faMagnifyingGlass, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const location = useLocation();

  return (
    <>
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 h-20 bg-transparent">
      <Link to="/" className="font-bold text-2xl tracking-widest hover:opacity-80 transition-opacity">
        AROMATICA
      </Link>
      <nav>
        <ul className="flex gap-10 font-light text-lg">
          <li>
            <Link 
              to="/shop" 
              className={`hover:opacity-80 transition-opacity ${
                location.pathname === '/shop' ? 'opacity-100' : 'opacity-70'
              }`}
            >
              Shop
            </Link>
          </li>
          <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Event</a></li>
          <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity">About</a></li>
        </ul>
      </nav>
      <div className="flex items-center gap-6 text-xl">
        <button className="opacity-80 hover:opacity-100 transition-opacity">
          <i className="fa fa-search"></i>
        </button>
        <button className="opacity-80 hover:opacity-100 transition-opacity">
          <i className="fa fa-user"></i>
        </button>
        <button className="opacity-80 hover:opacity-100 transition-opacity">
          <i className="fa fa-shopping-cart"></i>
        </button>
      </div>
    </header>
    </>
  );
}

export default Header;