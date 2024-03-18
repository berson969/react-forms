import React, { ChangeEvent, useState} from 'react';
import { TrainingType } from "./training.ts";

interface TrainingTableProps {
    trainings: TrainingType[];
    onDelete: (date: string) => void;
    onEdit: (date: string, distance: number) => void;
}

export const TrainingTable: React.FC<TrainingTableProps> = ({trainings, onEdit,  onDelete}) =>  {
    const [isEdit, setIsEdit] = useState("")

    const handlerButton = (arg: string) => {
        setIsEdit(arg)
    }


    return (
        <table className="w-full">
            <thead>
            <tr>
                <th className="border px-4 py-2">Дата</th>
                <th className="border px-4 py-2">Пройдено км</th>
                <th className="border px-4 py-2">Действия</th>
            </tr>
            </thead>
            <tbody>
            {trainings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(training => (
                <tr key={training.date}>
                    <td className="text-center px-4 py-2">{training.date}</td>
                    <td className="text-center px-4 py-2">
                        {isEdit === training.date ? (
                            <input
                                type="number"
                                value={training.distance}
                                className="border rounded-md "
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    onEdit(training.date, parseFloat(e.target.value))}
                            />
                        ) : (
                            training.distance.toFixed(2)
                        )}

                    </td>
                    <td className="flex justify-center  px-4 py-2">
                        { (isEdit === training.date) ? (
                            <button
                                className="text-white bg-blue-500 border rounded-md px-2 py-1 mr-2"
                                onClick={() => handlerButton("")}
                            >Save</button>
                        ) : (
                        <button className="text-blue-500 mr-2" onClick={() => handlerButton(training.date)}>✏️</button>
                        )}
                        <button className="text-blue-500 mr-2" onClick={() => onDelete(training.date)}>✘</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}