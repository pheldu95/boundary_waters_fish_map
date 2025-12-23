import { Outlet } from 'react-router';
import './App.css'
import Footer from './features/layout/Footer';
import NavBar from './features/layout/NavBar';
import SideBar from './features/layout/SideBar';
import { useState } from 'react';
import { AuthProvider } from './AuthContext';

function App() {
  const [isOpen, setIsOpen] = useState(false);  //for the sidebar

  return (
    <div className="flex flex-col min-h-screen bg-[url('./assets/website-background.png')] text-center font-display">
      <AuthProvider>
        <NavBar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <div className="flex-1 relative overflow-hidden">
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
          <Outlet />
        </div>
        <Footer />
      </AuthProvider>
    </div>
  )
}

export default App
