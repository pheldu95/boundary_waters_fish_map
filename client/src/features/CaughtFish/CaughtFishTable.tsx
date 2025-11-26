import { useEffect, useState } from "react";
import TableHeader from "../../components/tables/TableHeader/TableHeader";
import type { CaughtFish } from "../../lib/types";
import TableData from "../../components/tables/TableData/TableData";

export default function CaughtFishTable() {
    const headerText = ["Species", "Length (inches)", "Date Caught", "Lure Used"];
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
                <thead className="bg-neutral-secondary-soft border-b border-default bg-gray-100">
                    <tr>
                        {headerText.map((text) => (
                            <TableHeader key={text} text={text} />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {caughtFish.map((fish) => (
                        <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                            <TableData text={fish.caughtDate} />
                            <TableData text={fish.fishSpecies} />
                            <TableData text={fish.latitude} />
                            <TableData text={fish.fishingLure} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}