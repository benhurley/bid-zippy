import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";

type TSearchBar = {
    handleSearch: (query: string) => void,
    isLoading: boolean,
}

export default function SearchBar({ handleSearch, isLoading }: TSearchBar) {
    const [query, setQuery] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter') {
            setQuery(query);
        }
    };

    return (
        <>
            <div className="inline-flex mb-3">
                <p className="flex justify-start lg:text-lg text-sm">
                Browse eBay&apos;s<span className="mx-1 font-bold">most-watched</span>items
                </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <Input autoFocus type="text" className="px-3 py-2 w-full sm:min-w-[350px] min-w-[275px]" placeholder="Search by category (e.g. Watches)" onChange={handleChange} />
                <Button disabled={isLoading} className="px-3 py-2 w-full sm:w-auto" onKeyDown={handleKeyDown} onClick={() => handleSearch(query)}>Search eBay</Button>
            </div>
        </>
    )
}
