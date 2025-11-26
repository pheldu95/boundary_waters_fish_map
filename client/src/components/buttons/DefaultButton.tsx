interface DefaultButtonProps {
    text: string
}

export default function DefaultButton({ text }: DefaultButtonProps) {
    return (
        <button
            className="w-full text-gray-900 bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 max-w-sm text-center cursor-pointer"
        >
            {text}
        </button>
    )
}
