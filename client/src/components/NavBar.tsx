export default function NavBar() {
    return (
        <header className="backdrop-blur-sm bg-white/5 border-b border-white/10 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="{{ path('app_homepage') }}">
                        <div className="flex items-center space-x-2">
                            {/* <img className="h-[42px]" src="{{ asset('images/canoe_logo.png') }}" alt="canoe logo"> */}
                            <span className="text-xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                                Boundary Waters Fish Map
                            </span>
                        </div>
                    </a>
                    <nav className="hidden sm:flex space-x-8">
                        <a className="text-white/90 hover:text-amber-400 transition-colors duration-200 font-medium" href="{{ path('app_homepage') }}">
                            Home
                        </a>
                        <a className="text-white/90 hover:text-amber-400 transition-colors duration-200 font-medium" href="#">
                            About
                        </a>
                        <a className="text-white/90 hover:text-amber-400 transition-colors duration-200 font-medium" href="#">
                            Contact
                        </a>
                    </nav>

                    <button className="sm:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors" id="mobile-menu-button">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                <nav className="sm:hidden hidden pb-4" id="mobile-menu">
                    <div className="flex flex-col space-y-3">
                        <a className="text-white/90 hover:text-amber-400 transition-colors duration-200 font-medium" href="{{ path('app_homepage') }}">
                            Home
                        </a>
                        <a className="text-white/90 hover:text-amber-400 transition-colors duration-200 font-medium" href="#">
                            About
                        </a>
                        <a className="text-white/90 hover:text-amber-400 transition-colors duration-200 font-medium" href="#">
                            Contact
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    )
}
