import React from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SkeletonGridPlaceholder() {
    return (
        <Card className="m-2 shadow-lg flex flex-col h-[420px] w-[325px] animate-pulse">
            <CardHeader className="flex-grow">
                <div className="inline-flex justify-start">
                    <span className="w-5 h-5 bg-gray-300 rounded-full"></span>
                    <span className="ml-2 w-10 h-5 bg-gray-300 rounded"></span>
                </div>
                <div className="w-full relative flex items-center justify-around h-48 bg-gray-200 rounded-md mt-2"></div>
                <p className="font-bold text-center text-lg pt-4 w-24 h-6 bg-gray-300 rounded mx-auto"></p>
                <p className="text-center md:text-md text-sm w-16 h-5 bg-gray-300 rounded mx-auto mt-2"></p>
            </CardHeader>
            <CardFooter className="self-end">
                <CardTitle className="text-left md:text-lg text-sm font-normal w-full h-6 bg-gray-300 rounded"></CardTitle>
            </CardFooter>
        </Card>
    )
}
