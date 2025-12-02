import { NavLink } from "react-router";

export default function NavBar() {
    return (
        <header className="backdrop-blur-sm bg-fishblue border-b-3 border-redish shadow-lg sticky top-0 z-50 mb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex items-center justify-between h-16">
                    <NavLink to="/">
                        <div className="flex items-center space-x-2">
                            <img className="h-[80px]" src="/fishmaplogo.png" alt="fishmap logo" />
                            <span className="text-xl font-bold text-yellowishbone bg-clip-text hover:text-redish transition-colors duration-200">
                                Boundary Waters Fish Map
                            </span>
                        </div>
                    </NavLink>
                    <nav className="hidden sm:flex space-x-8">
                        <NavLink className="text-yellowishbone hover:text-redish transition-colors duration-200 font-medium" to="/">
                            Home
                        </NavLink>
                        <NavLink className="text-yellowishbone hover:text-redish transition-colors duration-200 font-medium" to="/about">
                            About
                        </NavLink>
                        <NavLink className="text-yellowishbone hover:text-redish transition-colors duration-200 font-medium" to="/contact">
                            Contact
                        </NavLink>
                    </nav>

                    <button className="sm:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors" id="mobile-menu-button">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                <nav className="sm:hidden hidden pb-4" id="mobile-menu">
                    <div className="flex flex-col space-y-3">
                        <NavLink className="text-yellowishbone hover:text-redish transition-colors duration-200 font-medium" to="/">
                            Home
                        </NavLink>
                        <NavLink className="text-yellowishbone hover:text-redish transition-colors duration-200 font-medium" to="/about">
                            About
                        </NavLink>
                        <NavLink className="text-yellowishbone hover:text-redish transition-colors duration-200 font-medium" to="/contact">
                            Contact
                        </NavLink>
                    </div>
                </nav>
            </div>
        </header>
    )
}
