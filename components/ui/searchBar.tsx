import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type TSearchBar = {
    handleSearch: (query: string) => void,
    isLoading: boolean,
}

export default function SearchBar({ handleSearch, isLoading }: TSearchBar) {
    const [query, setQuery] = useState('');
    const [hasSubmit, setHasSubmit] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter') {
            setQuery(query);
        }
    };

    const handleSubmit = () => {
        handleSearch(query);
        setHasSubmit(true);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleClear = () => {
        setQuery('');
        handleSearch('');
        setHasSubmit(false);
    };

    return (
        <div className="pb-4">
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-2 max-w-[400px] mt-4 relative">
                <div className="relative w-full sm:min-w-[350px] min-w-[315px]">
                    <Input 
                        type="text" 
                        className="text-base px-3 py-2 w-full pr-12" 
                        placeholder='e.g. Vintage Gold Omega Seamaster' 
                        onChange={handleChange} 
                        onKeyPress={handleKeyPress} 
                        value={query} 
                    />
                    {query.length > 0 && (
                        <button 
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none text-2xl p-1 pb-2" 
                            onClick={handleClear}
                        >
                            &times;
                        </button>
                    )}
                </div>
                <Button 
                    disabled={isLoading || query.trim().length === 0} 
                    className="px- py-2 w-full sm:w-auto transition duration-300 ease-in-out lg:hover:scale-[103%]" 
                    onKeyDown={handleKeyDown} 
                    onClick={handleSubmit}
                >
                    Search eBay
                </Button>
            </div>
        </div>
    );
}

