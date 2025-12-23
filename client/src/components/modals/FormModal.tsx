import type { JSX } from "react"

type Props = {
    children: JSX.Element
    title: string
    closeForm: () => void
}

export default function FormModal({ children, title, closeForm }: Props) {
    return (
        <>
            {/* this div makes the background blurry when the modal is open */}
            < div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
                onClick={closeForm}
            />
            <div className="open:flex fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary shadow-xl w-full md:w-fit md:max-w-[50%] md:min-w-[50%] m-0 z-50 animate-fade-in backdrop:bg-slate-600 backdrop:opacity-60">
                <div className="flex grow p-5">
                    <div className="grow overflow-auto p-1">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2>{title}</h2>
                                <form method="dialog">
                                    <button
                                        onClick={closeForm}
                                        className="hover:text-negative transition-colors p-1 hover:bg-white/10 rounded cursor-pointer"
                                        type="button"
                                        aria-label="Close window"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
