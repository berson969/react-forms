import React, { ChangeEvent, useState} from 'react';

export const Converter: React.FC = () => {

	const [rgbColor, setRgbColor] = useState([243, 244, 246]);
	const [stateRender, setStateRender] = useState("")


	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		console.log(value)
		setStateRender("")
		if (value.length === 7) {
			if (/^#[0-9A-F]{6}$/i.test(value)) {
				const r = parseInt(value.substring(1, 3), 16);
				const g = parseInt(value.substring(3, 5), 16);
				const b = parseInt(value.substring(5, 7), 16);
				setRgbColor([r, g, b]);
				setStateRender(`rgb(${rgbColor.join(', ')})`)
			} else {
				setStateRender('#Ошибка');
				setRgbColor([243, 244, 246]);
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen" style={
			{
			backgroundColor: `rgba(${rgbColor.join(', ')}, 0.5)`}
		}>
			<div className="rounded-md">
				<label htmlFor="HEX"></label>
				<input
					type="text"
					id="HEX"
					onChange={handleChange}
					className="mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
					placeholder="Input HEX"
				/>
				<div className="border rounded-md min-h-6 px-4 py-2 box-content" style={{borderColor: `rgb(${rgbColor.join(', ')})`,
					backgroundColor: `rgba(${rgbColor.join(', ')}, 0.8)`}}>
					{stateRender}
				</div>
			</div>
		</div>
	);
}
