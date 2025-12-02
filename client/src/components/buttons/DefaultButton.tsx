interface DefaultButtonProps {
    text: string
    onClickProps?: () => void
}

export default function DefaultButton({ text, onClickProps }: DefaultButtonProps) {
    return (
        <button
            className="group px-8 py-4 bg-foresty text-yellowishbone font-mono font-bold 
         hover:bg-forestyhover transition-colors 
         shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]
         hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] 
         transition-all cursor-pointer"
            onClick={onClickProps}
        >
            {text}
        </button>
    )
}
