import { useTheme } from '../../context/ThemeContext';
import {Sun, Moon, SidebarOpen, SidebarClose} from "lucide-react";
import AuthButtons from '../Auth/AuthButtons';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router';

interface NavbarPropsInterface {
    isSideBarOpen: boolean;
    onToggleSidebar: () => void;
}

const Navbar = ({ isSideBarOpen, onToggleSidebar }: NavbarPropsInterface) => {
    const {theme, toggleTheme} = useTheme();
    const { authenticated } = useAuth();
  return (
    <nav className="w-full h-14 px-6 py-3 text-text bg-surface flex items-center justify-between">
      {/* Sol Taraf */}
      <div className="flex items-center space-x-6">
        {authenticated && (
        <button onClick={onToggleSidebar}>
            <p className='text-text'>
            {isSideBarOpen ? <SidebarClose/> : <SidebarOpen/>}
            </p>
        </button>
        )}
        <NavLink
        to="/"
        className={({isActive}) => 
          `font-bold block px-4 py-2 ${isActive ? "text-accent" : "text-text"}`
        }
        >
          Home
        </NavLink>
        <NavLink
        to="/aboutme"
        className={({isActive}) => 
          `font-bold block px-4 py-2 ${isActive ? "text-accent" : "text-text"}`
        }
        >
          About Me
        </NavLink>
      </div>
      {/* Orta */}
      <div>
      </div>
      {/* Sağ Taraf */}
      <div className="flex items-center space-x-4">
        {/* Light/Dark Mode */}
        <button
          className="relative w-18 h-9 rounded-full bg-button-bg flex items-center justify-between px-2 transition-colors duration-300"
          onClick={() => {
            toggleTheme();
          }}
        >
          <Sun className="text-yellow-500" />
          <Moon className="text-white" />
          <span
            className={`absolute top-1 left-1 w-7 h-7 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
              theme === "dark" ? "translate-x-9" : "translate-x-0"
            }`}
          />
        </button>
        <div>
            <AuthButtons/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar