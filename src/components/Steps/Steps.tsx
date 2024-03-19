import React, {useEffect, useState} from 'react';
import { TrainingTable } from "./TrainingTable";
import { TrainingForm } from "./TrainingForm";
import { TrainingType } from "./training.ts";

const getTrainings = (): TrainingType[] => {
	const savingTrainings: string | null = localStorage.getItem("trainings");
	return savingTrainings ? JSON.parse(savingTrainings) : [];
}

const saveTrainings = (trainings: TrainingType[]) =>
	localStorage.setItem("trainings", JSON.stringify(trainings));

export const Steps: React.FC = () => {
	useEffect(() => {
		document.title = 'Менеджер тренировок';
	}, []);

	const [trainings, setTrainings] = useState<TrainingType[]>(getTrainings());

	const addTraining = (training: TrainingType) => {
		const existingTraining: TrainingType | undefined = trainings.find(t => t.date === training.date);
		if (existingTraining) {
			existingTraining.distance += training.distance;
			setTrainings([...trainings.filter(t => t.date !== training.date), existingTraining]);
		} else {
			setTrainings([training, ...trainings]);
		}
		saveTrainings(trainings)
	};

	const editTraining = (date: string, newDistance: number) => {
		setTrainings(trainings.map(training =>
			training.date === date ? {...training, distance: newDistance} : training))
		saveTrainings(trainings)
	}

	const deleteTraining = (date: string) => {
		setTrainings(trainings.filter(training=> training.date !== date));
		saveTrainings(trainings)
	};

	return (
		<div className="container mx-auto">
			<h1 className="text-center text-2xl font-bold m-12">Тренировки и прогулки</h1>
			<TrainingForm onAdd={addTraining} />
			<TrainingTable trainings={trainings} onEdit={editTraining} onDelete={deleteTraining} />
		</div>
	);
}