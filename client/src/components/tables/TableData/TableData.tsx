export interface TableDataProps {
    text: string;
}

export default function TableData({ text }: TableDataProps) {
    return (
        <td className="py-3 px-4 text-left font-medium">
            {text}
        </td>
    )
}
