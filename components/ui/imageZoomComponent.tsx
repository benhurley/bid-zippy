import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ImageZoomComponentProps {
    zoomedImage: string | null;
    closeZoomedImage: () => void;
}

const ImageZoomComponent: React.FC<ImageZoomComponentProps> = ({ zoomedImage, closeZoomedImage }) => {
    const [zoomLevel, setZoomLevel] = useState(1); // 1 means no zoom, 2 means zoomed in
    const [isZoomedIn, setIsZoomedIn] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1000;

    useEffect(() => {
        if (!zoomedImage) {
            resetZoom();
        }
    }, [zoomedImage]);

    const resetZoom = () => {
        setZoomLevel(1); // Set zoom to default (not zoomed)
        setIsZoomedIn(false); // Reset zoom toggle state
    };

    const handleZoomToggle = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); // Prevent image close on click
        
        const container = containerRef.current;
        if (!container) return;

        const { left, top, width, height } = container.getBoundingClientRect();
        const clickX = ((e.clientX - left) / width) * 100;
        const clickY = ((e.clientY - top) / height) * 100;

        if (!isZoomedIn) {
            // Zoom in
            setZoomLevel(2); // Adjust zoom level
            container.style.transformOrigin = `${clickX}% ${clickY}%`;
            setIsZoomedIn(true);
        } else {
            // Zoom out
            resetZoom();
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isZoomedIn) {
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            containerRef.current!.style.transformOrigin = `${x}% ${y}%`;
        }
    };

    return (
        <>
            {zoomedImage && (
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-[1000]`}
                    onClick={closeZoomedImage} // Clicking outside closes image
                >
                    <div
                        ref={containerRef}
                        className="relative w-full h-full overflow-hidden"
                        onClick={handleZoomToggle} // Click on the image to zoom in or out
                        onMouseMove={!isMobile && isZoomedIn ? handleMouseMove : undefined}
                        style={{
                            cursor: isZoomedIn ? 'zoom-out' : 'zoom-in', // Toggle cursor based on zoom state
                            transform: `scale(${zoomLevel})`,
                            transition: 'transform 0.3s ease', // Smooth zooming
                        }}
                    >
                        <Image
                            src={zoomedImage}
                            alt="zoomed-image"
                            layout="fill"
                            objectFit="contain"
                            className="transition-transform"
                        />
                    </div>
                    {!isMobile && zoomLevel < 2 && (
                        <div className="absolute top-5 right-5 flex space-x-2">
                            <button
                                className="bg-black text-white px-3 py-2 rounded border-2 border-black-700"
                                onClick={closeZoomedImage}
                                style={{
                                    transform: `scale(${zoomLevel})`,
                                    transition: 'transform 0.3s ease', // Smooth zooming
                                }}
                            >
                                X
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ImageZoomComponent;
