import { Outlet } from 'react-router';
import Navbar from '../components/LayoutComponents/Navbar';
import { useState } from 'react';
import Sidebar from '../components/LayoutComponents/Sidebar';
import GlobalAlert from '../components/LayoutComponents/GlobalAlert';

const Layout = () => {
    const [isSidebarOpen, setIsSideBarOpen] = useState(true);
  return (
    <div className='flex flex-col min-h-screen bg-bg'>
        <Navbar isSideBarOpen={isSidebarOpen} onToggleSidebar={() => setIsSideBarOpen(prev => !prev)}/>
        <GlobalAlert/>
        <div className='flex flex-1'>
            {isSidebarOpen && <Sidebar/>}
            <main className='flex-1 p-6 overflow-y-auto'>
                <Outlet/>
            </main>
        </div>

    </div>
  )
}

export default Layout