export default function FormModal() {
    return (
        <div className="open:flex fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#013f30] rounded-lg shadow-xl w-full md:w-fit md:max-w-[50%] md:min-w-[50%] m-0 z-50 animate-fade-in backdrop:bg-slate-600 backdrop:opacity-60" data-modal-target="dialog" data-action="close->modal#close click->modal#clickOutside">
            <div className="flex grow p-5">
                <div className="grow overflow-auto p-1">
                    <div className="text-white space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Add Caught Fish</h2>
                            <form method="dialog">
                                <button className="text-lg absolute top-5 right-5">
                                    X
                                </button>
                            </form>
                        </div>
                        {/* Form goes here? */}
                        {/* <CaughtFishForm /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
