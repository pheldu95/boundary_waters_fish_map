import React from 'react'

interface TableHeaderProps {
    text: string;
}

export default function RowTableHeader({ text }: TableHeaderProps) {
    return (
        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
            {text}
        </th>
    )
}
