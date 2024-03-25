'use client'

import Header from "@/components/organisms/header";
import EbayCard from "@/components/ui/ebayCard";
import SearchBar from "@/components/ui/searchBar";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";
import { EbayMostWatchedItem } from "@/app/api/ebay/types";
import { SyncLoader } from "react-spinners";
import Image from "next/image";
//import EbayPartnerNetwork from "@/components/organisms/ebayPartnerNetwork";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [results, setResults] = useState<EbayMostWatchedItem[]>([])
  const [isSticky, setIsSticky] = useState(false);

  const { toast } = useToast();

  const handleSearch = async (query: string) => {
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
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: `Error: ${errorMessage}`,
        description: 'Check the browser console for more info.',
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsSticky(scrollTop > 150);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen lg:min-h-[30em] lg:mt-24 pb-10">
        <Header />
        <div className={`z-10 w-full sticky grid justify-center top-0 bg-white ${isSticky ? 'shadow-xl' : ''}`}>
          <SearchBar handleSearch={handleSearch} isLoading={isLoading} />
        </div>
        {noResults &&
          <p className="flex justify-center mx-auto">No results found.</p>
        }
        {isLoading ?
        <div className="mt-20">
          <SyncLoader color="#000" speedMultiplier={0.6} />
        </div>
          : results.length > 0 &&
          <div className="mb-6">
            <p className="text-sm text-center pt-4 pb-1">Showing results for category:</p>
            <p className="font-bold text-sm text-center">{results.length > 0 && results[0].primaryCategoryName}</p>
          </div>
        }
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:text-left gap-6">
          {results.length > 0 && results?.map((item, index) => {
            return (
              <EbayCard
                key={index}
                item={item}
              />
            )
          })}
        </div>
        <Image className='relative mb-32 lg:mt-32' src="/ebayProgram.webp" alt="Member of Ebay's Developer Program" width={200} height={100} />
      </main>
      <Toaster />
      {/* Not needed while affiliate urls from api are in use */}
      {/*<EbayPartnerNetwork campaignId={5339048923} />*/}
    </>
  );
}
