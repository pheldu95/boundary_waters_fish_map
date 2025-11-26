interface TableHeaderProps {
    text: string;
}

export default function TableHeader({ text }: TableHeaderProps) {
    return (
        <th scope="col" className="py-3 px-4 text-left font-medium text-gray-600">
            {text}
        </th>
    )
}
