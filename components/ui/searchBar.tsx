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
        <div className="py-4">
            <div className="inline-flex justify-center mb-2">
                <p className="lg:text-lg text-md">
                Browse Ebay&apos;s<span className="mx-1 font-bold">most-watched</span>items
                </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-2 max-w-[400px]">
                <Input type="text" className="text-base px-3 py-2 w-full sm:min-w-[350px] min-w-[315px]" placeholder="Search by Category (e.g. Watches)" onChange={handleChange} />
                <Button disabled={isLoading || query.trim().length === 0} className="px-3 py-2 w-full sm:w-auto transition duration-300 ease-in-out lg:hover:scale-[103%]" onKeyDown={handleKeyDown} onClick={() => handleSearch(query)}>Search eBay</Button>
            </div>
        </div>
    )
}
