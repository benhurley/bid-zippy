'use client'

import Header from "@/components/organisms/header";
import EbayMostWatchedCard from "@/components/ui/ebayMostWatchedCard";
import SearchBar from "@/components/ui/searchBar";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";
import { EbayHasBidsItem, EbayMostWatchedItem } from "@/app/api/ebay/types";
import { SyncLoader } from "react-spinners";
import Image from "next/image";
import EbayHasBidsCard from "@/components/ui/ebayHasBidsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
//import EbayPartnerNetwork from "@/components/organisms/ebayPartnerNetwork";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [mostWatchedResults, setMostWatchedResults] = useState<EbayMostWatchedItem[]>([])
  const [hasBidsResults, setHasBidsResults] = useState<EbayHasBidsItem[]>([])
  const [isSticky, setIsSticky] = useState(false);
  const [mode, setMode] = useState('hasBids')

  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    try {
      window.scrollTo(0, 0);
      setNoResults(false);
      setMostWatchedResults([]);
      setIsLoading(true);
      if (mode === 'watchCount') {
        if (query.length > 0) {
          const response = await fetch(`/api/ebay?query=${encodeURIComponent(query)}`);
          const data = await response.json();
          if (data.itemRecommendations?.item.length === 0 || !data.itemRecommendations?.item) {
            setNoResults(true);
          }
          setMostWatchedResults(data.itemRecommendations?.item || []);
          setIsLoading(false);
      } else {
        setMostWatchedResults([])
        setIsLoading(false);
      }
        
      } else if (mode === 'hasBids') {
        if (query.length > 0) {
          const response = await fetch(`/api/ebay/items?keywords=${encodeURIComponent(query)}`);
          const data = await response.json();
  
          if (data.searchResult?.item?.length === 0 || !data.searchResult?.item) {
            setNoResults(true);
          }
          setHasBidsResults(data.searchResult?.item || []);
          setIsLoading(false);
        } else {
          setHasBidsResults([]);
          setIsLoading(false);
        }
      }
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
    setIsSticky(window.innerWidth > 1024 ? scrollTop > 500 : scrollTop > 300);
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
        <div className="inline-flex justify-left lg:mb-10 md:w-[400px] w-[315px]">
          <Tabs defaultValue="hasBids">
            <h2 className="font-bold mb-2">Select a Search Mode:</h2>
            <div className="md:mb-2 mb-12">
              <TabsList>
                <TabsTrigger value="hasBids" onClick={() => setMode('hasBids')}>Active Bids</TabsTrigger>
                <TabsTrigger value="watchCount" onClick={() => setMode('watchCount')}>Watch Count</TabsTrigger>
              </TabsList>
            </div>
            <div className="mt-4 text-sm">
              <TabsContent value="watchCount">Results will be sorted by watch count<Image className="inline-flex ml-1" width={20} height={20} src="/heart.webp" alt='heart' /></TabsContent>
              <TabsContent value="hasBids">All results will have at least 1 active bid</TabsContent>
            </div>
          </Tabs>
        </div>
        <div className={`z-10 w-full sticky grid justify-center top-0 bg-white ${isSticky ? 'shadow-xl bg-gradient-to-r from-indigo-100 from-10% via-sky-100 via-30% to-emerald-100 to-90%' : ''}`}>
          <SearchBar handleSearch={handleSearch} isLoading={isLoading} />
        </div>
        {noResults &&
          <p className="flex justify-center mx-auto">No results found.</p>
        }
        {isLoading ?
          <div className="mt-20">
            <SyncLoader color="#000" speedMultiplier={0.6} />
          </div>
          : mode === 'watchCount' && mostWatchedResults.length > 0 &&
          <div className="mb-6">
            <p className="text-sm text-center pt-4 pb-1">Showing results for category:</p>
            <p className="font-bold text-sm text-center">{mostWatchedResults.length > 0 && mostWatchedResults[0].primaryCategoryName}</p>
          </div>
        }
        <div className="mb-32 grid text-center lg:max-w-6xl lg:w-full lg:mb-0 lg:grid-cols-3 grid-cols-2 lg:text-left md:gap-6 gap-0 px-2 md:mt-5">
          {mode === 'watchCount' && mostWatchedResults.length > 0 && mostWatchedResults.map((item, index) => {
            return (
              <EbayMostWatchedCard
                key={index}
                item={item}
              />
            )
          })}
          {mode === 'hasBids' && hasBidsResults.length > 0 && hasBidsResults.map((item, index) => {
            return (
              <EbayHasBidsCard
                key={index}
                item={item}
              />
            )
          })}
        </div>
        <Image className='relative mb-48 lg:mt-32' src="/ebayProgram.webp" alt="Member of Ebay's Developer Program" width={200} height={100} />
      </main>
      <Toaster />
      {/* Not needed while affiliate urls from api are in use */}
      {/*<EbayPartnerNetwork campaignId={5339048923} />*/}
    </>
  );
}
