import { NavLink } from "react-router";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function SideBar({ isOpen, setIsOpen }: Props) {

    return (
        <>
            {/*  'translate-x-0' makes siebar go to its normal position '-translate-x-full' makes sidebar go off the screen */}
            <div className={`
                fixed top-0 left-0 h-full 
                w-64 bg-fishblue z-40 
                transition-transform duration-300 ease-in-out 
                hover:shadow-none hover:translate-x-[2px] 
                ${isOpen ? 'translate-x-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]' : '-translate-x-full'
                }`}>
                <div className="flex flex-col p-6 pt-20 space-y-4">
                    <NavLink
                        className="text-yellowishbone hover:text-redish transition-colors duration-200 font-medium"
                        to="/"
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className="text-yellowishbone hover:text-redish transition-colors duration-200 font-medium"
                        to="/map"
                        onClick={() => setIsOpen(false)}
                    >
                        View Map
                    </NavLink>
                    <NavLink
                        className="text-yellowishbone hover:text-redish transition-colors duration-200 font-medium"
                        to="/caughtFish"
                        onClick={() => setIsOpen(false)}
                    >
                        My Fish Log
                    </NavLink>
                    <NavLink
                        className="text-yellowishbone hover:text-redish transition-colors duration-200 font-medium"
                        to="/fishingLures"
                        onClick={() => setIsOpen(false)}
                    >
                        My Fishing Lures
                    </NavLink>
                </div>
            </div>

            {/* allows clicking off of the sidebar to close it */}
            {isOpen && (
                <div
                    className="fixed inset-0  bg-opacity-50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}