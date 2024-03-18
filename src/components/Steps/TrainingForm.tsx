import React, { FormEvent, useState} from 'react';
import { TrainingType } from "./training.ts";

interface TrainingFormProps {
    onAdd: (training: TrainingType) => void;
}

export const TrainingForm: React.FC<TrainingFormProps> = ({ onAdd }) => {
    const [date, setDate] = useState("");
    const [distance, setDistance] = useState("");
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!distance || !parseFloat(distance)) {
            setDistance("");
            return;
        }
        const newTraining: TrainingType = { date, distance: parseFloat(distance)}
        console.log(newTraining)
        onAdd(newTraining);
        setDate("");
        setDistance("");
    };
    return (
        <form onSubmit={handleSubmit} className="flex justify-center mb-4 gap-4">
            <label htmlFor="date" className="flex items-center">Дата:</label>
            <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="block border border-gray-300 rounded px-4 py-2"
            />
            <label htmlFor="distance" className="flex items-center">Пройдено км:</label>
            <input
                type="text"
                id="distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                required
                className="block border border-gray-300 rounded px-4 py-2"
            />
            <button type="submit" className="block bg-blue-500 text-white px-12 py-2 rounded">OK</button>
        </form>
    );
};
