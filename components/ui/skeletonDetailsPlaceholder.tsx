import React from 'react';

export default function SkeletonDetailsPlaceholder() {
    return (
        <div className="animate-pulse overflow-y-hidden">
            <div className="inline-flex justify-start mb-4">
                <span className="w-5 h-5 bg-gray-300 rounded-full"></span>
                <span className="ml-2 w-10 h-5 bg-gray-300 rounded"></span>
            </div>
            <div className="sm:max-h-[700px] max-h-[550px] px-2">
                <div className="text-left">
                    <div className="pt-2 pb-5 flex items-center m-auto sm:max-w-[410px] max-w-[250px]">
                        <div className="w-full sm:h-[400px] h-60 bg-gray-200 rounded-md"></div>
                    </div>
                    <div className="font-bold md:text-xl sm:text-md text-sm pb-2 bg-gray-300 rounded w-48 h-6 mb-2"></div>
                    <p className="mb-1 font-bold md:text-lg text-md bg-gray-300 rounded w-24 h-5"></p>
                    <p className="mb-1 md:text-lg text-md bg-gray-300 rounded w-32 h-5"></p>
                </div>
                <div className="my-5">
                    <div className="flex my-2 items-start">
                        <p className="font-bold text-md sm:w-32 w-24 bg-gray-300 rounded h-5"></p>
                        <p className="flex-1 bg-gray-300 rounded h-5 ml-2"></p>
                    </div>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div className="flex my-1 items-center" key={index}>
                            <p className="font-bold text-md sm:w-32 w-24 bg-gray-300 rounded h-5"></p>
                            <p className="flex-1 bg-gray-300 rounded h-5 ml-2"></p>
                        </div>
                    ))}
                    <div className="pt-5 pb-8 flex justify-center items-center">
                        <div className="bg-gray-300 rounded w-32 h-10"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
