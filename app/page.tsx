'use client'

import Header from "@/components/organisms/header";
import EbayCard from "@/components/ui/ebayCard";
import SearchBar from "@/components/ui/searchBar";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";
import { EbayMostWatchedItem } from "@/lib/types";
import { PropagateLoader } from "react-spinners";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [results, setResults] = useState<EbayMostWatchedItem[]>([])
  const { toast } = useToast();

  const handleSearch = async (query = '') => {
    try {
      setNoResults(false);
      setResults([]);
      setIsLoading(true);
      const response = await fetch(`/api/ebay?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      console.log('api data: ', data.itemRecommendations?.item)
      if (data.itemRecommendations?.item.length === 0 || !data.itemRecommendations?.item) {
        setNoResults(true);
      }
      setResults(data.itemRecommendations?.item || []);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: `Error: ${(error.message as string).toString()}`,
        description: 'Check console for more info.',
        variant: "destructive"
      })
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 px-10 pt-24 pb-10">
        <Header />
        <div className="mb-12">
          <SearchBar handleSearch={handleSearch} isLoading={isLoading}/>
        </div>
        {noResults &&
            <p className="flex justify-center mx-auto">No results found.</p>
          }
        {isLoading ?
          <PropagateLoader color="#000" />
          : results.length > 0 && <p className="text-sm text-center p-4">Showing results for category: <span className="font-bold">{results.length > 0 && results[0].primaryCategoryName}</span></p>}
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 sm:grid-cols-2  grid-cols-1 lg:text-left">
          {results.length > 0 && results?.map((item, index) => {
            return (
              <EbayCard
                key={index}
                item={item}
              />
            )
          })}
        </div>
      </main>
      <Toaster />
    </>
  );
}
