import TableHeader from "../../components/tables/TableHeader/TableHeader";
import TableData from "../../components/tables/TableData/TableData";
import TrashCanButton from "../../components/buttons/TrashCanButton";
import ViewDetailsButton from "../../components/buttons/ViewDetailsButton";
import LoadingTablePlaceholder from "../../components/placeholders/LoadingTablePlaceholder";
import { useCaughtFishes } from "../../lib/hooks/caughtFish/useCaughtFishes";
import { useCaughtFish } from "../../lib/hooks/caughtFish/useCaughtFish";

export default function CaughtFishTable() {
    const headerText = ["Species", "Length (inches)", "Date Caught", "Lure Used", "Actions"];

    const { caughtFishes, isLoading } = useCaughtFishes();
    const { deleteCaughtFish } = useCaughtFish();

    if (!caughtFishes || isLoading) return <LoadingTablePlaceholder headerText={headerText}/>;

    return (
        <div className="border border-gray-300 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden w-3/4 mx-auto m-8">
            <table className="w-full text-sm leading-5">
                <thead className="bg-neutral-secondary-soft bg-gray-100">
                    <tr className="border-b border-gray-200">
                        {headerText.map((text) => (
                            <TableHeader key={text} text={text} />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {caughtFishes.map((fish) => (
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
                                    <ViewDetailsButton />
                                    <TrashCanButton itemId={fish.id} deleteMutation={deleteCaughtFish} />
                                </div>
                            </TableData>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}