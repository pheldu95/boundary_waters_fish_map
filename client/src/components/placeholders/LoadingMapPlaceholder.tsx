import LoadingSpinner from './LoadingSpinner'

export default function LoadingMapPlaceholder() {
    return (
        <div
            className='h-[600px] w-[90%] bg-yellowishbone mx-auto z-0 justify-center flex items-center mb-4'
        >
            <LoadingSpinner />
        </div>
    )
}
