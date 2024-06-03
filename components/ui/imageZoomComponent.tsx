// ImageZoomComponent.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageZoomComponentProps {
    zoomedImage: string | null;
    closeZoomedImage: () => void;
}

const ImageZoomComponent: React.FC<ImageZoomComponentProps> = ({ zoomedImage, closeZoomedImage }) => {
    const [zoom, setZoom] = useState({ x: 50, y: 50 });
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isMaxZoom, setIsMaxZoom] = useState(false);

    useEffect(() => {
        if (!zoomedImage) {
            resetZoom();
        }
    }, [zoomedImage]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isMaxZoom) {
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            setZoom({ x, y });
        }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isMaxZoom) {
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
            const x = ((e.touches[0].clientX - left) / width) * 100;
            const y = ((e.touches[0].clientY - top) / height) * 100;
            setZoom({ x, y });
        }
    };

    const handleZoomIn = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        e.stopPropagation(); // Prevent closing the zoomed image
        setZoomLevel(prev => {
            const newZoomLevel = Math.min(prev + 0.5, 3); // Increase zoom level with a cap of 3
            if (newZoomLevel >= 3) {
                setIsMaxZoom(true);
            }
            return newZoomLevel;
        });
    };

    const handleResetZoom = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent closing the zoomed image
        resetZoom();
    };

    const resetZoom = () => {
        setZoomLevel(1);
        setIsMaxZoom(false);
        setZoom({ x: 50, y: 50 });
    };

    return (
        <>
            {zoomedImage && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-[1000] cursor-pointer"
                    onClick={closeZoomedImage}
                >
                    <div
                        className="relative w-[80vw] h-[80vh] overflow-hidden"
                        onMouseMove={handleMouseMove}
                        onClick={handleZoomIn}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleZoomIn}
                        style={{
                            cursor: isMaxZoom ? 'default' : 'zoom-in',
                            transformOrigin: `${zoom.x}% ${zoom.y}%`,
                        }}
                    >
                        <Image
                            src={zoomedImage}
                            alt="zoomed-image"
                            layout="fill"
                            objectFit="contain"
                            className={`transition-transform duration-200`}
                            style={{ transform: `scale(${zoomLevel})`, transformOrigin: `${zoom.x}% ${zoom.y}%` }}
                        />
                    </div>
                    <div className="absolute top-5 right-5 flex space-x-2">
                        {zoomLevel > 1 && <button
                            className="bg-gray-500 text-white p-2 rounded border-2 border-gray-700"
                            onClick={handleResetZoom}
                        >
                            Reset Zoom
                        </button>}
                        <button
                            className="bg-blue-500 text-white p-2 rounded border-2 border-blue-700"
                            onClick={closeZoomedImage}
                        >
                            Back to Listing
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageZoomComponent;
