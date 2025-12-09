import { Outlet } from 'react-router';
import './App.css'
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);  //for the sidebar

  return (
    <div className="flex flex-col min-h-screen bg-[url('./assets/website-background.png')] text-center font-display">
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen}/>
      <div className="flex-1 relative overflow-hidden">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
