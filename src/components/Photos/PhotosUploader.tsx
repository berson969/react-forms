import React, {ChangeEvent, useEffect, useState} from 'react';
import { faker } from '@faker-js/faker';

import { PhotoType } from "./PhotoType.ts";

import { Images } from "./Images.tsx";

const fileToDataUrl = (file: File) => {
	return new Promise<string>((resolve, reject) => {
		const fileReader = new FileReader();

		fileReader.addEventListener('load', (e) => {
				const target = e.currentTarget as FileReader;
				resolve(target.result as string);
		});

		fileReader.addEventListener('error', () => {
			reject(new Error("Unknown error occurred while reading the file"));
		});

		fileReader.readAsDataURL(file);
	});
};

export const PhotosUploader: React.FC = () => {
	useEffect(() => {
		document.title = 'Менеджер фотографий';
	}, []);

	const [photos, setPhotos] = useState<PhotoType[]>([]);
	const handleSelect = async (e: ChangeEvent<HTMLInputElement>) => {
		const files: File[] = [...e.target.files!];
		const urls = await Promise.all(files.map((file) => fileToDataUrl(file)));
		setPhotos(prevPhotos => [
			...prevPhotos,
			...urls.map((url, index) => ({ id: faker.string.uuid(), photoUrl: url, name: files[index].name }))
		]);
		console.log("photos", photos)
	};

	const handleRemove = (id: string) => {
		setPhotos((prevPhotos: PhotoType[]) => prevPhotos.filter(photo  => photo.id !== id))
	};

	return (
		<div className="container mx-auto">
			<div className="flex flex-col items-center justify-center mt-8">
				<div  className="relative w-full h-52 border border-gray-800 rounded-xl cursor-pointer">
					<span className="flex items-center text-3xl text-gray-800 justify-center w-full h-full pointer-events-none">Click to select</span>
					<input
						id="file"
						type="file"
						className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
						accept="image/*"
						multiple
						onChange={handleSelect}
					/>
				</div>
				<Images photos={photos} onDelete={handleRemove}/>
			</div>
		</div>
	)
}
