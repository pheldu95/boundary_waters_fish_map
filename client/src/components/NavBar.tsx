import { NavLink } from "react-router";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function NavBar({ isOpen, setIsOpen }: Props) {
    return (
        <header className="backdrop-blur-sm bg-fishblue border-b-3 border-redish shadow-lg sticky top-0 z-50 mb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left section - Burger menu */}
                    <div className="flex-1 flex justify-start">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-3 text-white hover:bg-white/10 rounded-lg transition-colors group cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-5 relative flex flex-col justify-between">
                                <span className={`absolute w-full h-0.5 bg-yellowishbone group-hover:bg-redish transition-all duration-300 ease-in-out origin-center ${
                                    isOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : 'rotate-0 top-0'
                                }`}></span>
                                <span className={`absolute w-full h-0.5 bg-yellowishbone group-hover:bg-redish transition-all duration-300 ease-in-out top-1/2 -translate-y-1/2 ${
                                    isOpen ? 'opacity-0' : 'opacity-100'
                                }`}></span>
                                <span className={`absolute w-full h-0.5 bg-yellowishbone group-hover:bg-redish transition-all duration-300 ease-in-out origin-center ${
                                    isOpen ? '-rotate-45 top-1/2 -translate-y-1/2' : 'rotate-0 bottom-0'
                                }`}></span>
                            </div>
                        </button>
                    </div>

                    <NavLink to="/" className="flex items-center space-x-2">
                        <img className="h-15" src="/fishmaplogo.png" alt="fishmap logo" />
                        <span className="text-xl font-bold text-yellowishbone hover:text-redish transition-colors duration-200 whitespace-nowrap">
                            Boundary Waters Fish Map
                        </span>
                    </NavLink>

                    <div className="flex-1 flex justify-end">
                        <nav className="hidden sm:flex items-center space-x-6">
                            <NavLink 
                                className={({ isActive }) => 
                                    `text-yellowishbone hover:text-redish transition-colors duration-200 font-medium ${
                                        isActive ? 'text-redish' : ''
                                    }`
                                } 
                                to="/"
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                className={({ isActive }) => 
                                    `text-yellowishbone hover:text-redish transition-colors duration-200 font-medium ${
                                        isActive ? 'text-redish' : ''
                                    }`
                                } 
                                to="/about"
                            >
                                About
                            </NavLink>
                            <NavLink 
                                className={({ isActive }) => 
                                    `text-yellowishbone hover:text-redish transition-colors duration-200 font-medium ${
                                        isActive ? 'text-redish' : ''
                                    }`
                                } 
                                to="/contact"
                            >
                                Contact
                            </NavLink>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}