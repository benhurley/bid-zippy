import React, { useState, useEffect, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import Image from 'next/image';

interface ImageZoomComponentProps {
    zoomedImage: string | null;
    closeZoomedImage: () => void;
}

const ImageZoomComponent: React.FC<ImageZoomComponentProps> = ({ zoomedImage, closeZoomedImage }) => {
    const [zoom, setZoom] = useState({ x: 50, y: 50 });
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isMaxZoom, setIsMaxZoom] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!zoomedImage) {
            resetZoom();
        }
    }, [zoomedImage]);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const touchMoveHandler = (e: TouchEvent) => {
                e.preventDefault();
            };
            container.addEventListener('touchmove', touchMoveHandler, { passive: false });
            return () => {
                container.removeEventListener('touchmove', touchMoveHandler);
            };
        }
    }, []);

    useEffect(() => {
        if (isMobile) {
            setZoomLevel(2); // Start zoomed in on mobile
        }
    }, []);

    const resetZoom = () => {
        setZoomLevel(isMobile ? 2 : 1);
        setIsMaxZoom(false);
        setZoom({ x: 50, y: 50 });
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (zoomLevel > 1) {
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            setZoom({ x, y });
        }
    };

    const handleZoomIn = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); // Prevent closing the zoomed image
        setZoomLevel(prev => Math.min(prev + 0.5, 3));
    };

    const handleResetZoom = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent closing the zoomed image
        resetZoom();
    };

    const bind = useGesture({
        onPinch: ({ offset: [d], memo }) => {
            if (memo === undefined) memo = zoomLevel;
            setZoomLevel(Math.max(1, memo * d));
            setIsMaxZoom(zoomLevel >= 3);
            return memo;
        },
        onDrag: ({ offset: [x, y] }) => {
            setPosition({ x, y });
        }
    });

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1000;

    return (
        <>
            {zoomedImage && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-[1000] cursor-pointer"
                    onClick={closeZoomedImage}
                >
                    <div
                        ref={containerRef}
                        {...(isMobile ? bind() : {})}
                        className="relative w-[80vw] h-[80vh] overflow-hidden"
                        onMouseMove={!isMobile ? handleMouseMove : undefined}
                        onClick={!isMobile ? handleZoomIn : undefined}
                        style={{
                            cursor: zoomLevel >= 3 ? 'move' : 'zoom-in',
                            touchAction: isMobile ? 'none' : 'auto',
                            transformOrigin: `${zoom.x}% ${zoom.y}%`,
                        }}
                    >
                        <div
                            style={{
                                transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                                transformOrigin: `${zoom.x}% ${zoom.y}%`,
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <Image
                                src={zoomedImage}
                                alt="zoomed-image"
                                layout="fill"
                                objectFit="contain"
                                className={`transition-transform duration-200`}
                            />
                        </div>
                    </div>
                    <div className="absolute top-5 right-5 flex space-x-2">
                        <button
                            className="bg-blue-500 text-white p-2 rounded border-2 border-blue-700"
                            onClick={closeZoomedImage}
                        >
                            Close
                        </button>
                        <button
                            className="bg-gray-500 text-white p-2 rounded border-2 border-gray-700"
                            onClick={handleResetZoom}
                        >
                            Reset Zoom
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageZoomComponent;
