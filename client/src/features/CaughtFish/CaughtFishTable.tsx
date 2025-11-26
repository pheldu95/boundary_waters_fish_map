import { useEffect, useState } from "react";
import TableHeader from "../../components/tables/TableHeader/TableHeader";
import type { CaughtFish } from "../../lib/types";
import TableData from "../../components/tables/TableData/TableData";
import DeleteButton from "../../components/buttons/DeleteButton";
import DefaultButton from "../../components/buttons/DefaultButton";

export default function CaughtFishTable() {
    const headerText = ["Species", "Length (inches)", "Date Caught", "Lure Used", "Actions"];
    const [caughtFish, setCaughtFish] = useState<CaughtFish[]>([]);

    useEffect(() => {
        fetch('/api/caught_fishes')
            .then(response => response.json())
            .then(data => setCaughtFish(data.member))
            .catch(error => console.error('Error fetching fish species:', error));
    }, []);

    return (
        <div className="border border-gray-300 shadow-sm rounded-lg overflow-hidden w-3/4 mx-auto mt-16">
            <table className="w-full text-sm leading-5">
                <thead className="bg-neutral-secondary-soft bg-gray-100">
                    <tr className="border-b border-gray-200">
                        {headerText.map((text) => (
                            <TableHeader key={text} text={text} />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {caughtFish.map((fish) => (
                        <tr
                            key={fish.id}
                            className="even:bg-gray-50 odd:bg-white border-b border-gray-200"
                        >
                            <TableData>{fish.fishSpecies.name}</TableData>
                            <TableData>{fish.length?.toString() ?? 'N/A'}</TableData>
                            <TableData>{fish.caughtDate}</TableData>
                            <TableData>{fish.fishingLure.name}</TableData>
                            <TableData>
                                <div className="flex gap-4">
                                    <DefaultButton text={'View Details'}/>
                                    <DeleteButton />
                                </div>
                            </TableData>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}