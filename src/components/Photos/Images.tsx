import React from 'react';
import { PhotoType } from "./PhotoType.ts";

interface ImagesProps {
    photos: PhotoType[];
    onDelete: (name: string) => void;
}

export const Images: React.FC<ImagesProps> = ({ photos, onDelete })  => {
    return (
        <div className="my-12 mx-6 grid grid-cols-3 gap-8">
            {photos.map((photo: PhotoType) => (
                <div key={photo.id} className="relative">
                    <img src={photo.photoUrl} alt={photo.name} className="h-24 w-full object-cover" />
                    <button
                        className="absolute -top-3 -right-3  bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
                        onClick={() => onDelete(photo.id)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
}
