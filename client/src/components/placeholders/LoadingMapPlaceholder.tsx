import LoadingSpinner from './LoadingSpinner'

export default function LoadingMapPlaceholder() {
    return (
        <div
            className='h-[600px] w-[80%] bg-yellowishbone mx-auto my-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] z-0 justify-center flex items-center'
        >
            <LoadingSpinner />
        </div>
    )
}
