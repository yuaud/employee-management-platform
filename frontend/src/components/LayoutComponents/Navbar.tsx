import { useTheme } from '../../context/ThemeContext';
import {Sun, Moon, SidebarOpen, SidebarClose} from "lucide-react";
import AuthButtons from '../Auth/AuthButtons';

interface NavbarPropsInterface {
    isSideBarOpen: boolean;
    onToggleSidebar: () => void;
}

const Navbar = ({ isSideBarOpen, onToggleSidebar }: NavbarPropsInterface) => {
    const {theme, toggleTheme} = useTheme();
  return (
    <nav className="w-full h-14 px-6 py-3 text-text bg-surface flex items-center justify-between">
      {/* Sol Taraf */}
      <div className="flex items-center space-x-6">
        <button onClick={onToggleSidebar}>
            <p className='text-text'>
            {isSideBarOpen ? <SidebarClose/> : <SidebarOpen/>}
            </p>
        </button>
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