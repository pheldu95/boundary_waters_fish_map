import type { ReactNode } from "react"; //ReactNode is a typescript type that describes "anything that can be rendered in React"
export interface TableDataProps {
    children: ReactNode;
}

export default function TableData({ children }: TableDataProps) {
    return (
        <td className="py-3 px-4 text-left font-medium">
            {children}
        </td>
    )
}
