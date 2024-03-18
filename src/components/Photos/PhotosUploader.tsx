import React, { ChangeEvent, useState} from 'react';

type PhotoType = {
	photoUrl: string;
	name: string
}

const fileToDataUrl = (file: File) => {
	return new Promise<string>((resolve, reject) => {
		const fileReader = new FileReader();

		fileReader.addEventListener('load', (e) => {
				const target = e.currentTarget as FileReader;
				resolve(target.result as string);
		});

		fileReader.addEventListener('error', (e) => {
			const target = e.currentTarget as FileReader;
			reject(new Error(target.error as string));
		});

		fileReader.readAsDataURL(file);
	});
};

export const PhotosUploader: React.FC = () => {
	const [photos, setPhotos] = useState<PhotoType[]>([]);
	const handleSelect = async (e: ChangeEvent<HTMLInputElement>) => {
		const files: File[] = [...e.target.files!];
		const urls = await Promise.all(files.map((file) => fileToDataUrl(file)));
		console.log("files", files)
		console.log('urls', urls)
		setPhotos(prevPhotos => [
			...prevPhotos,
			// ...urls.map((url, index) => { photoUrl: url, name: files[index].name })
		]);
	};

	const handleRemove = (name: string) => {
		setPhotos((prevPhotos: PhotoType[]) => prevPhotos.filter(photo  => photo.name !== name))
	};

	return (
		<div className="flex flex-col items-center justify-center mt-8">
			<label htmlFor="file" className="relative bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
				<span className="pointer-events-none">Click to select</span>
				<input
					id="file"
					type="file"
					className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
					accept="image/*"
					multiple
					onChange={handleSelect}
				/>
			</label>
			<div className="mt-4 grid grid-cols-3 gap-4">
				{photos.map(photo => (
					<div key={photo.name} className="relative">
						<img src={photo.photoUrl} alt="Preview" className="h-24 w-full object-cover" />
						<button
							className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
							onClick={() => handleRemove(photo.name)}
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
		</div>
	)
}
