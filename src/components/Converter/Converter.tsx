import React, {ChangeEvent, useEffect, useState} from 'react';

const isDark = (color: number[]) => {
	const [r, g, b] = color;
	const brightness = Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
	return brightness < 148;
}

export const Converter: React.FC = () => {
	const [rgbColor, setRgbColor] = useState([243, 244, 246]);
	const [stateRender, setStateRender] = useState(() => "");

	useEffect(() => {
		document.title = 'Конвертер';
	}, []);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setStateRender( () => "" );
		console.log("00",rgbColor, stateRender)
		if (value.length === 7) {
			if (/^#[0-9A-F]{6}$/i.test(value)) {
				const r = parseInt(value.substring(1, 3), 16);
				const g = parseInt(value.substring(3, 5), 16);
				const b = parseInt(value.substring(5, 7), 16);
				setRgbColor([r, g, b]);
				setStateRender(() => `rgb(${[r, g, b].join(', ')})`);
			} else {
				setRgbColor([255, 0, 0]);
				setStateRender(() => '#Ошибка');
			}
		} else {
			setRgbColor([243, 244, 246])
			setStateRender( () => "" );
		}
	};


	return (
		<div className="flex flex-col items-center justify-center min-h-screen" style={
			{
			backgroundColor: `rgb(${rgbColor.join(', ')}`}
		}>
			<div className="relative">
				<label htmlFor="HEX"></label>
				<input
					type="text"
					id="HEX"
					onChange={handleChange}
					className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
					placeholder="Input HEX"
				/>
				<div
					className="absolute top-16 left-0 border rounded-md w-full h-full px-4 py-2 block"
					style={{
						backgroundColor: "inherit",
						background: `rgba(0, 0, 0, 0.3)`,
						color: isDark(rgbColor) ? 'white' : 'black'
					}}
				>
					{stateRender}
				</div>
			</div>
		</div>
	);
}
